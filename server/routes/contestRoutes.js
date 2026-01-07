const express = require('express');
const { requireAuth, options } = require('../middlewares/authM');
const {
    checkTestId,
    getContestLanding,
    startTest,
    getContestData,
    submitSolution,
    endContest
} = require('../controllers/contestCon');

const router = express.Router();

router.get('/pgs', (req, res) => { res.send("I'm up") });

// User Contest Flow
router.post('/check_valid', checkTestId);
router.get('/test/data', requireAuth(options), getContestData); // Protected
router.get('/test/:id', getContestLanding);
router.post('/start_test', requireAuth(options), startTest);
router.post('/test/submit', requireAuth(options), submitSolution);
router.post('/test/end', requireAuth(options), endContest);

module.exports = router;