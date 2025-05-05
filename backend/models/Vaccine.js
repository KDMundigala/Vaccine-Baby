
const mongoose = require('mongoose');

const vaccineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ageInMonths: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  diseasesAvoided: {
    type: [String],
    required: true
  }
}, { timestamps: true });

const Vaccine = mongoose.model('Vaccine', vaccineSchema);

module.exports = Vaccine;
