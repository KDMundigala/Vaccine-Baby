const express = require('express');
const { 
  getChatHistory, 
  sendMessage, 
  getMidwives, 
  markMessagesAsRead,
  getUsers 
} = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/midwives', protect, getMidwives);
router.get('/users', protect, getUsers);
router.get('/:userId', protect, getChatHistory);
router.post('/', protect, sendMessage);
router.put('/read/:userId', protect, markMessagesAsRead);

module.exports = router;
