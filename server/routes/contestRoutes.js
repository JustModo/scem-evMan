const express = require("express");
const { requireAuth } = require("../middlewares/checkAuth");

const { 
    validateJoinId, 
    getLandingDetails 
} = require('../controllers/testAccessController');

const {
  checkTestId,
  getContestLanding,
  startTest,
  getContestData,
  getTestQuestions,
  listAllContests,
  submitSolution,
  endContest,
  runCode,
} = require("../controllers/contestCon");

const router = express.Router();

// --- TEST ACCESS ROUTES ---

// Validation (6-digit ID)
router.post('/validate', validateJoinId);

// Landing Page Metadata
router.get('/:id/landing', requireAuth(), getLandingDetails);

// START the test (Creates the session)
router.post('/start', requireAuth(), startTest);

// Fetch Questions for the Session
router.get('/data', requireAuth(), getContestData);

// --- OTHER CONTEST ROUTES ---

// User Contest Flow
router.post("/check_valid", checkTestId);
router.get("/test/data", requireAuth(), getContestData); // Protected
router.get("/test/:id", getContestLanding);
router.get("/questions/:id", getTestQuestions); // Get questions for a specific test
router.get("/list/all", listAllContests); // List all contests (for testing)
router.get("/:id/data", requireAuth(), getContestData); // Protected (param style)
router.get("/:id", getContestLanding);
router.post("/start_test", requireAuth(), startTest);
router.post("/submit", requireAuth(), submitSolution);
router.post("/end", requireAuth(), endContest);
router.post("/:id/run", requireAuth(), runCode); // Run button: visible testcases only

module.exports = router;
