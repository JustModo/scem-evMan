const testAns = require('../helpers/testAns');
// Example loop over user answers
const evaluateMCQSubmissions = (userSubmissions, questions) => {
  const results = [];

  for (let i = 0; i < questions.length; i++) {
    const userAnswer = userSubmissions[i];  // e.g., 'A'
    const correctAnswer = questions[i].correctOption; // e.g., 'B'
    const marks = questions[i].marks || 1;

    const result = testAns({
      submitted: userAnswer,
      correct: correctAnswer,
      marks: marks
    });

    results.push({
      questionId: questions[i]._id,
      ...result
    });
  }

  return results;
};
