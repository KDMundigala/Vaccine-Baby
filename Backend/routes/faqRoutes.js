
const express = require('express');
const { 
  getFAQs, 
  getFAQsByCategory, 
  createFAQ, 
  updateFAQ, 
  deleteFAQ 
} = require('../controllers/faqController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getFAQs);
router.get('/category/:category', getFAQsByCategory);
router.post('/', createFAQ);
router.route('/:id')
  .put(protect, admin, updateFAQ)
  .delete(protect, admin, deleteFAQ);

module.exports = router;
