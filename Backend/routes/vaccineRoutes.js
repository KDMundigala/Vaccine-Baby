
const express = require('express');
const { 
  getVaccines, 
  getVaccinationSchedule, 
  recordMissedVaccination 
} = require('../controllers/vaccineController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getVaccines);
router.get('/schedule', protect, getVaccinationSchedule);
router.post('/missed', protect, recordMissedVaccination);

module.exports = router;
