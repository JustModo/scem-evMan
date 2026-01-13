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
        const contest = await Contest.findById(req.params.id);
        if (!contest) return res.status(404).json({ success: false, error: 'Contest not found' });

        return res.json({
            success: true,
            data: {
                title: contest.title,
                description: contest.description,
                duration: {
                    start: contest.startTime,
                    end: contest.endTime
                },
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
        const contestId = req.query.contestId;
        const contest = await Contest.findById(contestId);
        if (!contest) return res.status(404).json({ success: false, error: 'Contest not found' });

        // Fetch actual questions from Question model since schema now stores Strings
        // Assuming contest.questions is array of ID strings
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
                    boilerplate: q.boilerplateCode, // Map new schema field
                    questionType: q.questionType,
                    options: q.options,
                    points: q.marks
                }))
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Submit solution
const submitSolution = async (req, res) => {
    try {
        // TODO: Integrate with Submissions model
        return res.json({
            success: true,
            submissionId: "submission-id-placeholder"
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    End contest
const endContest = async (req, res) => {
    return res.json({
        success: true,
        redirectUrl: `/leaderboard`
    });
};

// @desc    Start test (User Attempt)
const startTest = async (req, res) => {
    try {
        const { contestId, userId } = req.body;
        // Verify user and contest?
        // Logic to create a session or 'attempt' record would go here

        return res.json({
            success: true,
            sessionToken: "session-token-placeholder" // In real app, generate JWT or DB session ID
        });
    } catch (error) {
        return res.json({ success: false, error: error.message });
    }
};

// @desc    Get questions for a specific test
// @route   GET /api/test/:id/questions
// @access  Public
const getTestQuestions = async (req, res) => {
    try {
        const { id: testId } = req.params;

        // Validate test ID format
        if (!testId) {
            return res.status(400).json({
                success: false,
                error: 'Test ID is required'
            });
        }

        // Find the contest/test
        const contest = await Contest.findById(testId);
        if (!contest) {
            return res.status(404).json({
                success: false,
                error: `Test with ID ${testId} not found`
            });
        }

        // Check if test is active (optional: can add status check)
        const currentTime = new Date();
        const isActive = currentTime >= contest.startTime && currentTime <= contest.endTime;

        // Fetch questions
        const Question = require('../models/Question');
        const questions = await Question.find({
            _id: { $in: contest.questions }
        });

        // Map questions with metadata and sample test cases
        const questionsData = questions.map(q => ({
            id: q._id,
            type: q.type,
            title: q.title,
            description: q.description,
            difficulty: q.difficulty,
            marks: q.marks,
            questionType: q.questionType,
            // Coding specific
            constraints: q.constraints,
            inputFormat: q.inputFormat,
            outputFormat: q.outputFormat,
            boilerplateCode: q.boilerplateCode,
            functionName: q.functionName,
            inputVariables: q.inputVariables,
            // Sample test cases (limit to first 2 for preview)
            sampleTestCases: q.testcases ? q.testcases.slice(0, 2) : [],
            totalTestCases: q.testcases ? q.testcases.length : 0,
            // MCQ specific
            options: q.options,
            // Don't return the correct answer to the client
        }));

        return res.json({
            success: true,
            data: {
                testId: contest._id,
                title: contest.title,
                description: contest.description,
                isActive,
                totalQuestions: questionsData.length,
                startTime: contest.startTime,
                endTime: contest.endTime,
                questions: questionsData
            }
        });
    } catch (error) {
        console.error('Error fetching test questions:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Internal server error'
        });
    }
};

// @desc    List all contests (for testing/debugging)
// @route   GET /api/test/list/all
// @access  Public
const listAllContests = async (req, res) => {
    try {
        const contests = await Contest.find({}, { _id: 1, title: 1, description: 1, startTime: 1, endTime: 1, type: 1 });
        
        return res.json({
            success: true,
            data: {
                total: contests.length,
                contests: contests
            }
        });
    } catch (error) {
        console.error('Error listing contests:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Internal server error'
        });
    }
};

module.exports = {
    startContest,
    manageViolations,
    checkTestId,
    getContestLanding,
    getContestData,
    getTestQuestions,
    listAllContests,
    submitSolution,
    endContest,
    startTest
};
