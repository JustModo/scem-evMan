const express = require('express');
const { requireAuth, options } = require('../middlewares/authM');
const {
    createProblem,
    updateProblem,
    deleteQuestion,
    getProblemDetail,
    getAdminContests,
    getAdminContestDetail,
    createContest,
    updateContest,
    getAdminContestResults,
    deleteContest
} = require('../controllers/adminCon');

const router = express.Router();

router.get('/pgs', requireAuth({ options }), (req, res) => { res.send("I'm up") });

// Questions
router.post('/questions/create', requireAuth(options), createProblem);
router.put('/questions/:id/edit', requireAuth(options), updateProblem);
router.get('/questions/:id', requireAuth(options), getProblemDetail);
router.delete('/questions/:id', requireAuth(options), deleteQuestion);

// Contests
router.get('/tests', requireAuth(options), getAdminContests);
router.get('/tests/:id', requireAuth(options), getAdminContestDetail);
router.post('/tests/create', requireAuth(options), createContest);
router.put('/tests/:id/edit', requireAuth(options), updateContest);
router.delete('/tests/:id', requireAuth(options), deleteContest);
router.get('/tests/:id/result', requireAuth(options), getAdminContestResults);

module.exports = router;