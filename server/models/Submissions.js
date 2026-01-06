const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  contest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contest',
    required: true,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  answer: mongoose.Schema.Types.Mixed,
  // Coding specific fields
  language: String,
  status: {
    type: String,
    enum: ['Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error', 'Compilation Error', 'Pending'],
  },
  testCaseResults: [{
    testCase: Number,
    passed: Boolean,
    input: String,
    expectedOutput: String,
    actualOutput: String,
    error: String,
  }],
  executionTime: Number, // in milliseconds
  memoryUsed: Number, // in KB
  score: {
    type: Number,
    default: 0,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);