const express = require("express");
const { requireAuth } = require("../middlewares/checkAuth");

const {
  validateJoinId,
  getContestLanding,
  startTest,
  getContestData,
  listAllContests,
  endTest
} = require("../controllers/contestCon");

const {
  runCode,
  submitCode,
  saveMCQ
} = require("../controllers/submitCon");

const { validateContest } = require("../middlewares/contestMiddleware");

const router = express.Router();

// --- PUBLIC ACCESS ---

// Join via ID (returns contestId)
router.post('/join', validateJoinId);

// List all (dev/debug)
router.get('/list', listAllContests);

// Landing Page (Public test info) - Just needs to exist
router.get('/:id', validateContest(), getContestLanding);


// --- AUTHENTICATED ACTIONS ---

// Start Attempt (Create session) - Must be started, not ended
router.post('/start', requireAuth(), validateContest({ checkStarted: true, checkEnded: true }), startTest);

// Get Test Data - Must be started
router.get('/:id/data', requireAuth(), validateContest({ checkStarted: true, checkEnded: true }), getContestData);

// Run Code - Must be active
router.post('/:id/run', requireAuth(), validateContest({ checkStarted: true, checkEnded: true }), runCode);

// Submit Code Solution - Must be active
router.post('/:id/submit', requireAuth(), validateContest({ checkStarted: true, checkEnded: true }), submitCode);

// End Test
router.post('/:id/end', requireAuth(), validateContest({ checkStarted: true }), endTest);

// Save MCQ Answer
router.post('/:id/mcq', requireAuth(), validateContest({ checkStarted: true, checkEnded: true }), saveMCQ);

module.exports = router;
