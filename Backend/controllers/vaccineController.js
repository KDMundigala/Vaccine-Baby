const Vaccine = require('../models/Vaccine');
const VaccinationRecord = require('../models/VaccinationRecord');
const User = require('../models/User');
const Baby = require('../models/Baby');

// @desc    Get all vaccines
// @route   GET /api/vaccines
// @access  Public
const getVaccines = async (req, res) => {
  try {
    const vaccines = await Vaccine.find({});
    res.json(vaccines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get vaccination schedule for a user
// @route   GET /api/vaccines/schedule
// @access  Private
const getVaccinationSchedule = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await Baby.findOne({ userId });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get all vaccines
    const vaccines = await Vaccine.find({}).sort({ ageInMonths: 1 });
    
    // Get all vaccination records for this user
    const vaccinationRecords = await VaccinationRecord.find({ userId });
    
    // Calculate scheduled dates based on date of birth
    const dob = new Date(user.dateOfBirth);
    const today = new Date();
    
    const scheduleData = vaccines.map(vaccine => {
      // Find if there's a vaccination record for this vaccine
      const record = vaccinationRecords.find(r => String(r.vaccineId) === String(vaccine._id));
      
      // Calculate the scheduled date for this vaccine
      let scheduledDate = new Date(dob);
      scheduledDate.setMonth(scheduledDate.getMonth() + vaccine.ageInMonths);
      
      // If there's a record, use its scheduled date
      if (record) {
        scheduledDate = new Date(record.scheduledDate);
      }
      
      // Determine status based on date and record
      let status = 'scheduled';
      if (scheduledDate < today) {
        status = 'passed';
      }
      if (record && record.status === 'missed') {
        status = 'missed';
      }
      
      return {
        _id: vaccine._id,
        name: vaccine.name,
        ageInMonths: vaccine.ageInMonths,
        description: vaccine.description,
        diseasesAvoided: vaccine.diseasesAvoided,
        scheduledDate,
        status,
        missedDays: record?.missedDays
      };
    });
    
    res.json(scheduleData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Record a missed vaccination
// @route   POST /api/vaccines/missed
// @access  Private
const recordMissedVaccination = async (req, res) => {
  try {
    const { vaccineId, missedDays } = req.body;
    const userId = req.user._id;
    
    if (!vaccineId || missedDays === undefined) {
      return res.status(400).json({ message: 'Please provide vaccineId and missedDays' });
    }
    
    if (missedDays < 0 || missedDays > 14) {
      return res.status(400).json({ message: 'Missed days must be between 0 and 14' });
    }
    
    const user = await Baby.findOne({ userId });
    const vaccine = await Vaccine.findById(vaccineId);
    
    if (!user || !vaccine) {
      return res.status(404).json({ message: 'User or vaccine not found' });
    }
    
    // Calculate the scheduled date
    const dob = new Date(user.dateOfBirth);
    const scheduledDate = new Date(dob);
    scheduledDate.setMonth(scheduledDate.getMonth() + vaccine.ageInMonths);
    
    // Update or create vaccination record
    let record = await VaccinationRecord.findOne({ userId, vaccineId });
    
    if (record) {
      record.status = 'missed';
      record.missedDays = missedDays;
      // Add missed days to the scheduled date
      const newDate = new Date(record.scheduledDate);
      newDate.setDate(newDate.getDate() + missedDays);
      record.scheduledDate = newDate;
    } else {
      // Add missed days to the scheduled date
      const newDate = new Date(scheduledDate);
      newDate.setDate(newDate.getDate() + missedDays);
      
      record = new VaccinationRecord({
        userId,
        vaccineId,
        scheduledDate: newDate,
        status: 'missed',
        missedDays
      });
    }
    
    await record.save();
    
    // Get all vaccination records and update future dates
    const allVaccines = await Vaccine.find({}).sort({ ageInMonths: 1 });
    
    // For each vaccine, update future scheduled dates
    const updatedRecords = [];
    for (const vaccine of allVaccines) {
      // Calculate the original scheduled date
      const originalDate = new Date(dob);
      originalDate.setMonth(originalDate.getMonth() + vaccine.ageInMonths);
      
      // Only update future vaccine dates
      if (originalDate > scheduledDate) {
        let existingRecord = await VaccinationRecord.findOne({ userId, vaccineId: vaccine._id });
        
        if (existingRecord) {
          // Add missed days to the scheduled date
          const newDate = new Date(existingRecord.scheduledDate);
          newDate.setDate(newDate.getDate() + missedDays);
          existingRecord.scheduledDate = newDate;
          await existingRecord.save();
          updatedRecords.push({
            vaccineId: vaccine._id,
            scheduledDate: newDate,
            status: existingRecord.status
          });
        } else {
          // Create a new record with adjusted date
          const newDate = new Date(originalDate);
          newDate.setDate(newDate.getDate() + missedDays);
          
          const newRecord = new VaccinationRecord({
            userId,
            vaccineId: vaccine._id,
            scheduledDate: newDate,
            status: 'scheduled'
          });
          
          await newRecord.save();
          updatedRecords.push({
            vaccineId: vaccine._id,
            scheduledDate: newDate,
            status: 'scheduled'
          });
        }
      }
    }
    
    // Add the current vaccine to the updated records
    updatedRecords.push({
      vaccineId: vaccine._id,
      scheduledDate: record.scheduledDate,
      status: 'missed',
      missedDays: missedDays
    });
    
    res.json({
      message: 'Vaccination missed and future schedules updated',
      updatedRecords
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getVaccines,
  getVaccinationSchedule,
  recordMissedVaccination
};
