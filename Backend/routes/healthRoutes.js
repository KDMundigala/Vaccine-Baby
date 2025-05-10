
const express = require('express');
const { 
  calculateWeightStatus, 
  calculateHeightStatus, 
  calculateHealthStatus 
} = require('../controllers/healthController');

const router = express.Router();

router.post('/weight', calculateWeightStatus);
router.post('/height', calculateHeightStatus);
router.post('/calculate', calculateHealthStatus);

module.exports = router;
