const Contest = require('../models/Contest');
const User = require('../models/User');
const Question = require('../models/Question');
const { languageMap } = require('../utils/languageMap');
const { getJudge } = require('@pomelo/code-gen');

// @desc    Validate 6-digit Join ID (OTP)
// @route   POST /api/contest/validate
// @access  Public
const validateJoinId = async (req, res) => {
    try {
        const { joinId } = req.body;

        // Search the database for the 6-digit joinCode
        const contest = await Contest.findOne({ joinId: joinId });

        if (!contest) {
            return res.status(404).json({
                success: false,
                message: "Invalid Join ID. No test found with this code."
            });
        }

        // Return needed info for redirect
        return res.status(200).json({
            success: true,
            contestId: contest._id,
            title: contest.title
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
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

// @desc    Check if test ID is valid
const checkTestId = async (req, res) => {
    try {
        const { contestId } = req.body;
        const contest = await Contest.findById(contestId);

        if (!contest) {
            return res.json({ isValid: false });
        }

        return res.json({
            isValid: true,
            contestInfo: {
                title: contest.title,
                description: contest.description
            }
        });
    } catch (error) {
        return res.json({ isValid: false });
    }
};

// @desc    Get contest landing details
const getContestLanding = async (req, res) => {
    try {
        const contest = req.contest;
        const now = new Date();
        const start = new Date(contest.startTime);
        const canStart = now >= start && now <= new Date(contest.endTime);

        return res.json({
            success: true,
            data: {
                title: contest.title,
                description: contest.description,
                duration: contest.duration || (new Date(contest.endTime) - new Date(contest.startTime)) / 60000, // min
                startTime: contest.startTime,
                endTime: contest.endTime,
                serverTime: now,
                canStart: canStart,
                totalProblems: contest.questions.length,
                author: contest.author || "SCEM Coding Club",
                rules: contest.rules || []
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get contest data for attempt
const getContestData = async (req, res) => {
    try {
        const contest = req.contest;

        // Fetch actual questions from Question model
        const questions = await require('../models/Question').find({
            _id: { $in: contest.questions }
        });

        const timeRemaining = Math.max(0, (new Date(contest.endTime) - new Date()) / 1000);

        return res.json({
            success: true,
            data: {
                contestId: contest._id,
                title: contest.title,
                timeRemaining,
                problems: questions.map(q => ({
                    id: q._id,
                    title: q.title,
                    difficulty: q.difficulty,
                    description: q.description,
                    inputFormat: q.inputFormat,
                    outputFormat: q.outputFormat,
                    constraints: q.constraints,
                    boilerplateCode: q.boilerplateCode,
                    questionType: q.questionType,
                    options: q.options,
                    marks: q.marks
                }))
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Start test (User Attempt)
const startTest = async (req, res) => {
    try {
        const contest = req.contest;
        const userId = req.user.id || req.user._id || req.user.sub;
        const contestId = contest._id;

        const now = new Date(); // Already checked middleware but useful for timeRemaining

        const user = await User.findById(userId);
        if (user && !user.registeredContests.includes(contestId)) {
            user.registeredContests.push(contestId);
            await user.save();
        }

        // Initialize Submission if not exists
        const Submission = require('../models/Submissions');
        let submission = await Submission.findOne({ contest: contestId, user: userId });
        if (!submission) {
            submission = new Submission({ contest: contestId, user: userId, status: 'Ongoing' });
            await submission.save();
        }

        return res.json({
            success: true,
            message: 'Test started successfully',
            data: {
                contestId: contest._id,
                title: contest.title,
                timeRemaining: Math.floor((new Date(contest.endTime) - now) / 1000)
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get questions for a specific test
const getTestQuestions = async (req, res) => {
    try {
        const { id: testId } = req.params;
        const contest = await Contest.findById(testId);
        if (!contest) return res.status(404).json({ success: false, error: 'Test not found' });

        const questions = await Question.find({ _id: { $in: contest.questions } });
        const questionsData = questions.map(q => ({
            id: q._id,
            title: q.title,
            description: q.description,
            difficulty: q.difficulty,
            marks: q.marks,
            questionType: q.questionType,
            constraints: q.constraints,
            inputFormat: q.inputFormat,
            outputFormat: q.outputFormat,
            boilerplateCode: q.boilerplateCode,
            functionName: q.functionName,
            inputVariables: q.inputVariables,
            options: q.options
        }));

        return res.json({ success: true, data: { questions: questionsData } });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    List all contests
const listAllContests = async (req, res) => {
    try {
        const contests = await Contest.find({}, { _id: 1, title: 1, description: 1 });
        return res.json({ success: true, data: { contests } });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    End Test (Mark as Completed)
const endTest = async (req, res) => {
    try {
        const { contestId } = req.body;
        const userId = req.user.id || req.user._id || req.user.sub;

        const Submission = require('../models/Submissions');
        const submission = await Submission.findOne({ contest: contestId, user: userId });

        if (!submission) {
            return res.status(404).json({ success: false, error: 'Submission not found' });
        }

        submission.status = 'Completed';
        submission.submittedAt = new Date();
        await submission.save();

        return res.json({
            success: true,
            message: 'Test completed successfully'
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    validateJoinId,
    manageViolations,
    checkTestId,
    getContestLanding,
    getContestData,
    getTestQuestions,
    listAllContests,
    startTest,
    endTest
};
