const Contest = require('../models/Contest');

// Function to update status based on time
const updateContestStatuses = async () => {
    try {
        const now = new Date();

        // 1. Publish: 'draft' -> 'waiting' ? 
        // User requested default 'draft'. Usually drafts need manual publish.
        // But for time automations:
        // Move 'waiting' -> 'ongoing'
        const startRes = await Contest.updateMany(
            {
                status: 'waiting',
                startTime: { $lte: now },
                endTime: { $gt: now } // Ensure we don't skip to ongoing if it already ended
            },
            { $set: { status: 'ongoing' } }
        );

        if (startRes.modifiedCount > 0) {
            console.log(`[Cron] Started ${startRes.modifiedCount} contests.`);
        }

        // 2. Complete: 'ongoing' -> 'completed'
        // Also catch any 'waiting' that missed the window and ended
        const endRes = await Contest.updateMany(
            {
                status: { $in: ['waiting', 'ongoing'] },
                endTime: { $lte: now }
            },
            { $set: { status: 'completed' } }
        );

        if (endRes.modifiedCount > 0) {
            console.log(`[Cron] Completed ${endRes.modifiedCount} contests.`);
        }

    } catch (error) {
        console.error("[Cron] Error updating statuses:", error);
    }
};

// Initialize the cron job
const initCron = () => {
    console.log("[Cron] Status update service started...");

    // Run immediately on startup
    updateContestStatuses();

    // Run every 60 seconds
    setInterval(updateContestStatuses, 60 * 1000);
};

module.exports = initCron;
