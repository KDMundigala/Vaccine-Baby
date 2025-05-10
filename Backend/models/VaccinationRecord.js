
const mongoose = require('mongoose');

const vaccinationRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vaccineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vaccine',
    required: true
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  actualDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'missed'],
    default: 'scheduled'
  },
  missedDays: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const VaccinationRecord = mongoose.model('VaccinationRecord', vaccinationRecordSchema);

module.exports = VaccinationRecord;
