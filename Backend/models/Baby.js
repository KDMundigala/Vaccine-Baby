const mongoose = require('mongoose');

const babySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  hometown: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['boy', 'girl'],
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  profilePicture: {
    type: String,
    default: ''
  },
  // —— New guardian sub-document ——
  guardian: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/  // simple email regex
    },
    phone: {
      type: String,
      required: true
    }
  },
  // —— New notificationMethod field ——
  notificationMethod: {
    type: String,
    enum: ['email', 'sms', 'both'],  // adjust options as needed
    required: true,
    
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Baby', babySchema);
