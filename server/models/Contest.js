const mongoose = require('mongoose');
const contestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  type: {
    type: String,
    required: true,
  },
  // Added joinId 
  joinId: {
    type: String,
    unique: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  // Added duration for Module 1 logic (calculated in minutes)
  duration: {
    type: Number,
  },
  questions: [String],
  author: {
    type: String,
    required: true,
  },
  rules: {
    type: [String],
    default: [],
  },
  visibility: {
    type: String,
    enum: ['public', 'private'],
    default: 'private',
  },
  status: {
    type: String,
    enum: ['waiting', 'ongoing', 'completed'],
    default: 'waiting',
  },
}, { timestamps: true });

module.exports = mongoose.models.Contest || mongoose.model('Contest', contestSchema);
