const express = require("express");
const { requireAuth } = require("../middlewares/checkAuth");

const {
  validateJoinId, // New consolidated
  getContestLanding, // Updated
  startTest, // Kept
  getContestData, // Kept
  submitSolution, // Kept
  runCode, // Kept
  listAllContests // Optional, kept for now
} = require("../controllers/contestCon");

const router = express.Router();

// --- PUBLIC ACCESS ---

// Join via ID (returns contestId)
router.post('/join', validateJoinId);

// List all (dev/debug)
router.get('/list', listAllContests);

// Landing Page (Public test info)
router.get('/:id', getContestLanding);


// --- AUTHENTICATED ACTIONS ---

// Start Attempt (Create session)
router.post('/start', requireAuth(), startTest);

// Get Test Data (Questions, etc. during attempt)
router.get('/:id/data', requireAuth(), getContestData);

// Run Code (Test/Compile)
router.post('/:id/run', requireAuth(), runCode);

// Submit Solution
router.post('/:id/submit', requireAuth(), submitSolution);

module.exports = router;
