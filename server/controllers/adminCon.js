const Question = require('../models/Question');
const Contest = require('../models/Contest');
const Submission = require('../models/Submissions');
const { connectDB } = require('./dbCon');

// --- Questions ---

// @desc Create a new problem
const createProblem = async (req, res) => {
    try {
        await connectDB();
        const {
            title, description, difficulty, marks,
            questionType, options, correctAnswer,
            constraints, inputFormat, outputFormat, boilerplateCode, testcases,
            type, // Extract Type
        } = req.body;

        const newQuestion = new Question({
            title, description, difficulty, marks,
            questionType, options, correctAnswer,
            constraints, inputFormat, outputFormat,
            boilerplateCode,
            testcases,
            type // Save Type
        });

        await newQuestion.save();
        res.status(200).json({ success: true, problemId: newQuestion._id });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc Update an existing problem
const updateProblem = async (req, res) => {
    try {
        await connectDB();
        const { id } = req.params;
        const {
            title, description, difficulty, marks,
            questionType, options, correctAnswer,
            constraints, inputFormat, outputFormat, boilerplateCode, testcases,
            type
        } = req.body;

        const updates = {
            title, description, difficulty, marks,
            questionType, options, correctAnswer,
            constraints, inputFormat, outputFormat,
            boilerplateCode,
            testcases,
            type
        };

        const question = await Question.findByIdAndUpdate(id, updates, { new: true });

        if (!question) return res.status(404).json({ success: false, error: 'Question not found' });

        res.status(200).json({ success: true, problemId: question._id });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc Get problem details
const getProblemDetail = async (req, res) => {
    try {
        await connectDB();
        const question = await Question.findById(req.params.id);
        if (!question) return res.status(404).json({ success: false, error: 'Question not found' });

        res.status(200).json({ success: true, problem: question });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc Delete a problem
const deleteQuestion = async (req, res) => {
    try {
        await connectDB();
        const { id } = req.params;

        const question = await Question.findByIdAndDelete(id);

        if (!question) return res.status(404).json({ success: false, error: 'Question not found' });

        res.status(200).json({ success: true, message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// --- Contests ---

// @desc Get all contests for admin dashboard
const getAdminContests = async (req, res) => {
    try {
        await connectDB();
        // Return summary fields
        const contests = await Contest.find().select('title description createdAt questions author startTime endTime status');
        const now = new Date();

        const summary = contests.map(c => {
            return {
                id: c._id,
                title: c.title,
                description: c.description,
                createdAt: c.createdAt,
                status: c.status, // Use DB status directly
                participants: 0,
                problemCount: c.questions ? c.questions.length : 0,
                // Format dates for frontend if needed, or send ISO strings
                startsAt: c.startTime,
                duration: `${Math.round((c.endTime - c.startTime) / (1000 * 60))} mins` // Estimate duration display
            };
        });
        res.status(200).json({ success: true, contests: summary });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc Get detailed contest information
const getAdminContestDetail = async (req, res) => {
    try {
        await connectDB();
        const contest = await Contest.findById(req.params.id);
        if (!contest) return res.status(404).json({ success: false, error: 'Contest not found' });

        // Populate questions manually since they are strings
        const questions = await Question.find({ _id: { $in: contest.questions } });

        const contestWithQuestions = contest.toObject();
        contestWithQuestions.questions = questions;

        res.status(200).json({ success: true, contest: contestWithQuestions });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc Create a new contest
const createContest = async (req, res) => {
    try {
        await connectDB();
        const { title, description, duration, problemIds, rules, type, visibility, author, status } = req.body;

        // duration is { start, end }
        const startTime = new Date(duration.start);
        const endTime = new Date(duration.end);

        const newContest = new Contest({
            title, description, startTime, endTime,
            questions: problemIds, // Now just [String], matches schema
            rules, // Now [String], matches schema
            type, visibility,
            status: req.body.status || 'waiting', // Save Status
            author: author || "Admin" // Required field
        });

        await newContest.save();
        res.status(200).json({ success: true, contestId: newContest._id });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc Update an existing contest
const updateContest = async (req, res) => {
    try {
        await connectDB();
        const { id } = req.params;
        const { title, description, duration, problemIds, rules, status, visibility } = req.body;

        const updates = { title, description, rules, status, visibility };
        if (duration) {
            updates.startTime = new Date(duration.start);
            updates.endTime = new Date(duration.end);
        }
        if (problemIds) {
            updates.questions = problemIds;
        }

        const contest = await Contest.findByIdAndUpdate(id, updates, { new: true });
        if (!contest) return res.status(404).json({ success: false, error: 'Contest not found' });

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc Get contest results
const getAdminContestResults = async (req, res) => {
    try {
        // Placeholder for results logic
        res.status(200).json({ success: true, results: { participants: { total: 0, active: 0 } } });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc Delete a contest
const deleteContest = async (req, res) => {
    try {
        await connectDB();
        const { id } = req.params;

        const contest = await Contest.findById(id);
        if (!contest) return res.status(404).json({ success: false, error: 'Contest not found' });

        if (contest.status === 'ongoing') {
            return res.status(400).json({ success: false, error: 'Cannot delete an ongoing contest' });
        }

        await Contest.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'Contest deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc Get admin dashboard statistics
const getAdminStats = async (req, res) => {
    try {
        await connectDB();
        const now = new Date();

        const [
            activeContests,
            totalQuestions,
            draftTests,
            totalParticipants,
            recentTestsData,
            questionBankData
        ] = await Promise.all([
            Contest.countDocuments({ startTime: { $lte: now }, endTime: { $gte: now } }),
            Question.countDocuments({}),
            Contest.countDocuments({ startTime: { $gt: now } }),
            Submission.countDocuments({}),
            Contest.find().sort({ createdAt: -1 }).limit(4).lean(),
            Question.aggregate([
                { $group: { _id: "$difficulty", count: { $sum: 1 } } }
            ])
        ]);

        const recentTests = await Promise.all(recentTestsData.map(async (contest) => {
            const participants = await Submission.countDocuments({ contest: contest._id });
            return {
                ...contest,
                participants
            };
        }));

        // Process question bank data to match UI structure
        const difficultyMap = { Easy: 0, Medium: 0, Hard: 0 };
        let totalQBank = 0;
        questionBankData.forEach(item => {
            if (item._id && difficultyMap.hasOwnProperty(item._id)) {
                difficultyMap[item._id] = item.count;
                totalQBank += item.count;
            }
        });

        const questionBank = {
            easy: difficultyMap.Easy,
            medium: difficultyMap.Medium,
            hard: difficultyMap.Hard,
            total: totalQBank
        };

        return res.status(200).json({
            success: true,
            activeContests,
            totalQuestions,
            draftTests,
            totalParticipants,
            recentTests,
            questionBank
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    createProblem,
    updateProblem,
    getProblemDetail,
    getAdminContests,
    getAdminContestDetail,
    createContest,
    updateContest,
    getAdminContestResults,
    deleteQuestion,
    deleteContest,
    getAdminStats
};
