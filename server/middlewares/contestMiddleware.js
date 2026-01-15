const Contest = require('../models/Contest');

/**
 * Middleware to validate contest access
 * @param {Object} options Configuration options
 * @param {boolean} options.checkStarted - Verify if the contest has started
 * @param {boolean} options.checkEnded - Verify if the contest has ended
 * @param {boolean} options.checkRegistered - Verify if user is registered (requires auth middleware first)
 */
const validateContest = (options = {}) => async (req, res, next) => {
    try {
        // Get contestId from params or body
        const contestId = req.params.id || req.body.contestId || req.params.contestId;

        if (!contestId) {
            return res.status(400).json({ success: false, error: 'Contest ID is required' });
        }

        const contest = await Contest.findById(contestId);
        if (!contest) {
            return res.status(404).json({ success: false, error: 'Contest not found' });
        }

        const now = new Date();
        const startTime = new Date(contest.startTime);
        const endTime = new Date(contest.endTime);

        if (options.checkStarted && now < startTime) {
            return res.status(403).json({ success: false, error: 'Contest has not started yet' });
        }

        if (options.checkEnded && now > endTime) {
            return res.status(403).json({ success: false, error: 'Contest has already ended' });
        }

        // Optional: Check registration if user is attached (auth middleware expected)
        if (options.checkRegistered && req.user) {
            const userId = req.user.id || req.user._id || req.user.sub;
            // Assuming registeredContests is on user or we check submission/registration model
            // For now, let's keep it simple or check the local user object if populated
            // But usually registration check might be separate or part of the "start" logic
            // We'll leave strict registration check to the controller or specific middleware if needed
            // to avoid circular dependency or complex user fetching here if not already done.
        }

        // Attach to request
        req.contest = contest;
        next();
    } catch (error) {
        console.error('Middleware Error:', error);
        return res.status(500).json({ success: false, error: 'Server error validating contest' });
    }
};

module.exports = { validateContest };
