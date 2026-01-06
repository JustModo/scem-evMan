const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  title: String,
  description: String,
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
  },
  marks: Number,
  // MCQ specific fields
  questionType: {
    type: String,
    enum: ['Single Correct', 'Multiple Correct'],
  },
  options: [String],
  correctAnswer: String,
  // Coding specific fields
  constraints: String,
  inputFormat: String,
  outputFormat: String,
  boilerplateCode: {
    cpp: String,
    c: String,
    java: String,
    python: String,
    javascript: String,
  },
  testcases: String,
}, { timestamps: true });

module.exports = mongoose.models.Question || mongoose.model('Question', questionSchema);
