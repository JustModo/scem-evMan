const express = require('express');
const router = express.Router();
// Use the new requireAuth middleware
const { requireAuth } = require('../middlewares/checkAuth'); 

const { 
    validateJoinId, 
    getLandingDetails 
} = require('../controllers/testAccessController');

const {
     getContestData, 
    startTest
} = require('../controllers/contestCon');

// --- ROUTES ---

// Validation (6-digit ID)
router.post('/validate', validateJoinId);

// Landing Page Metadata
router.get('/:id/landing', requireAuth(), getLandingDetails);

// START the test (Creates the session)
router.post('/start', requireAuth(), startTest);

// Fetch Questions for the Session
router.get('/data', requireAuth(), getContestData);

module.exports = router;