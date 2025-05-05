const Message = require('../models/Message');
const User = require('../models/User');

// @desc    Get chat history between users
// @route   GET /api/chats/:userId
// @access  Private
const getChatHistory = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const otherUserId = req.params.userId;
    
    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: otherUserId },
        { sender: otherUserId, receiver: currentUserId }
      ]
    }).sort({ createdAt: 1 });
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Send a message
// @route   POST /api/chats
// @access  Private
const sendMessage = async (req, res) => {
  try {
    console.log('HTTP sendMessage req.body:', req.body);
    const { receiverId, text } = req.body;
    const senderId = req.user._id;
    
    if (!receiverId || typeof text !== 'string' || text.trim() === '') {
      return res.status(400).json({ message: 'Please provide receiverId and non-empty text' });
    }
    
    const receiver = await User.findById(receiverId);
    
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }
    
    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      text,
    });
    
    const savedMessage = await message.save();
    
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get available midwives for chat
// @route   GET /api/chats/midwives
// @access  Private
const getMidwives = async (req, res) => {
  try {
    // Get all users with role 'midwife'
    const midwives = await User.find({ role: 'midwife' })
      .select('_id fullName profilePicture email')
      .lean();
    
    res.json(midwives);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark messages as read
// @route   PUT /api/chats/read/:userId
// @access  Private
const markMessagesAsRead = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const otherUserId = req.params.userId;
    
    await Message.updateMany(
      { sender: otherUserId, receiver: currentUserId, read: false },
      { read: true }
    );
    
    res.json({ message: 'Messages marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users who have chatted with the current user
// @route   GET /api/chats/users
// @access  Private
const getUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    
    // Find all unique users who have either sent or received messages from the current user
    const messages = await Message.find({
      $or: [
        { sender: currentUserId },
        { receiver: currentUserId }
      ]
    });
    
    // Get unique user IDs (excluding the current user)
    const userIds = new Set();
    messages.forEach(message => {
      if (message.sender.toString() !== currentUserId.toString()) {
        userIds.add(message.sender.toString());
      }
      if (message.receiver.toString() !== currentUserId.toString()) {
        userIds.add(message.receiver.toString());
      }
    });
    
    // Get user details for these IDs
    const users = await User.find({ _id: { $in: Array.from(userIds) } })
      .select('_id fullName profilePicture email')
      .lean();
    
    res.json(users);
  } catch (error) {
    console.error('Error in getUsers:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getChatHistory,
  sendMessage,
  getMidwives,
  markMessagesAsRead,
  getUsers
};
