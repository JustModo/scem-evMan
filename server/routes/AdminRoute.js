const express = require('express');
const router = express.Router();

const { requireAuth } = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

const { startContest, manageViolations } = require('../controllers/contestCon');


router.use(requireAuth, isAdmin);

router.post('/contests/:id/start', startContest);
router.post('/contests/:id/violation', manageViolations);

// Add more routes like create/update/delete contests/questions here

module.exports = router;
