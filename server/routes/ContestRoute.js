const express = require('express');
const router = express.Router();
const {
  getAllContests,
  getContestById,
} = require('../controllers/contestController');

// Public routes
router.get('/contests', getAllContests);
router.get('/contests/:id', getContestById);

module.exports = router;
