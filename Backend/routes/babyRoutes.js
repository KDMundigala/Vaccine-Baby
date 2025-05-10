const express = require('express');
const router = express.Router();
const babyController = require('../controllers/babyController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected with authentication
router.use(protect);

// Create a new baby
router.post('/', babyController.createBaby);

// Get all babies for the authenticated user
router.get('/', babyController.getBabies);

// Get a single baby
router.get('/:id', babyController.getBaby);

// Update a baby
router.put('/:id', babyController.updateBaby);

// Delete a baby
router.delete('/:id', babyController.deleteBaby);

module.exports = router; 