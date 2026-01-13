const express = require("express");
const { requireAuth } = require("../middlewares/checkAuth");
const {
  checkTestId,
  getContestLanding,
  startTest,
  getContestData,
  getTestQuestions,
  listAllContests,
  submitSolution,
  endContest,
} = require("../controllers/contestCon");

const router = express.Router();

// User Contest Flow
router.post("/check_valid", checkTestId);
router.get("/test/data", requireAuth(), getContestData); // Protected
router.get("/test/:id", getContestLanding);
router.get("/questions/:id", getTestQuestions); // Get questions for a specific test
router.get("/list/all", listAllContests); // List all contests (for testing)
router.post("/start_test", requireAuth(), startTest);
router.post("/test/submit", requireAuth(), submitSolution);
router.post("/test/end", requireAuth(), endContest);

module.exports = router;
