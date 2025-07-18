const Contest = require('../models/Contest');
const User = require('../models/User');

// @desc    Start a contest
// @route   POST /api/contests/:id/start
// @access  Private (requires authentication)
const startContest = async (req, res) => {
    try {
        const contest = await Contest.findById(req.params.id);

        if (!contest) {
            return res.status(404).json({ message: 'Contest not found' });
        }

        // Check if the user is authorized to start the contest (e.g., admin or creator)
        // For now, we'll assume any authenticated user can start for demonstration
        
        contest.status = 'ongoing';
        contest.startTime = new Date();
        await contest.save();

        res.json({ message: 'Contest started successfully', contest });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Manage violations in a contest
// @route   POST /api/contests/:id/violation
// @access  Private (requires authentication)
const manageViolations = async (req, res) => {
    try {
        const { userId, details } = req.body;
        const contest = await Contest.findById(req.params.id);

        if (!contest) {
            return res.status(404).json({ message: 'Contest not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add violation logic here
        // For example, adding to a violations array in the contest model
        const violation = {
            user: userId,
            timestamp: new Date(),
            details: details || ' details provided.'
        };

        // Assuming contest schema has a 'violations' array
        if (!contest.violations) {
            contest.violations = [];
        }
        contest.violations.push(violation);
        
        await contest.save();

        res.json({ message: 'Violation recorded successfully', violation });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    startContest,
    manageViolations,
};
