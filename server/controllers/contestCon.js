const Contest = require('../models/Contest');
const User = require('../models/User');
const Question = require('../models/Question');
const { languageMap } = require('../utils/languageMap');
const { getJudge } = require('@pomelo/code-gen');

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
        const { contestId } = req.body;
        
        // Get user from auth middleware (requireAuth sets req.user)
        const userId = req.user?.sub || req.user?.id;
        
        if (!userId) {
            return res.status(401).json({ 
                success: false, 
                error: 'User not authenticated' 
            });
        }

        if (!contestId) {
            return res.status(400).json({ 
                success: false, 
                error: 'Contest ID is required' 
            });
        }

        // Verify contest exists
        const contest = await Contest.findById(contestId);
        if (!contest) {
            return res.status(404).json({ 
                success: false, 
                error: 'Contest not found' 
            });
        }

        // Check if contest has started
        const now = new Date();
        const startTime = new Date(contest.startTime);
        const endTime = new Date(contest.endTime);

        if (now < startTime) {
            return res.status(403).json({ 
                success: false, 
                error: 'Contest has not started yet',
                startTime: contest.startTime
            });
        }

        if (now > endTime) {
            return res.status(403).json({ 
                success: false, 
                error: 'Contest has already ended' 
            });
        }

        // Register user to contest if not already registered
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                error: 'User not found' 
            });
        }

        if (!user.registeredContests.includes(contestId)) {
            user.registeredContests.push(contestId);
            await user.save();
        }

        // Calculate time remaining
        const timeRemaining = Math.floor((endTime - now) / 1000); // in seconds

        return res.json({
            success: true,
            message: 'Test started successfully',
            data: {
                contestId: contest._id,
                title: contest.title,
                startTime: contest.startTime,
                endTime: contest.endTime,
                timeRemaining,
                totalQuestions: contest.questions.length
            }
        });
    } catch (error) {
        console.error('Error starting test:', error);
        return res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

// Helper function to remove trailing whitespace
const removeTrailingWhitespace = (output) => {
    if (typeof output !== 'string') return output;
    return output.replace(/\s+$/g, '');
};

// @desc    Run code against visible test cases only (for testing, not submission)
// @route   POST /api/contests/:id/run
// @access  Private
const runCode = async (req, res) => {
    try {
        const { questionId, code, language } = req.body;
        const userId = req.user?.sub || req.user?.id;

        if (!userId) {
            return res.status(401).json({ 
                success: false, 
                error: 'User not authenticated' 
            });
        }

        if (!questionId || !code || !language) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing required fields: questionId, code, language' 
            });
        }

        // Fetch the question to get test cases
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ 
                success: false, 
                error: 'Question not found' 
            });
        }

        // Map language to Judge0 ID
        const judge0Id = languageMap[language.toLowerCase()];
        if (!judge0Id) {
            return res.status(400).json({ 
                success: false, 
                error: `Unsupported language: ${language}` 
            });
        }

        // Wrap user code using code-gen wrapper functions
        let wrappedCode = code;
        try {
            const judge = getJudge(language.toLowerCase());
            const problemConfig = {
                method: question.functionName || 'solve',
                input: (question.inputVariables || []).map(v => ({
                    variable: v.variable,
                    type: v.type
                }))
            };
            wrappedCode = judge.wrapCode(code, problemConfig);
            console.log(`Wrapped code for ${language}:`, wrappedCode);
        } catch (err) {
            console.warn(`Could not wrap code for ${language}, using original code:`, err.message);
        }

        // Get only visible test cases (typically first 2-3 test cases)
        // You can modify this logic based on your requirements
        const allTestCases = question.testcases || [];
        const visibleTestCases = allTestCases.slice(0, Math.min(2, allTestCases.length));

        if (visibleTestCases.length === 0) {
            return res.status(400).json({ 
                success: false, 
                error: 'No test cases available for this question' 
            });
        }

        // Execute code against visible test cases
        const judge0Url = process.env.JUDGE0_URL || 'http://localhost:2358';
        const executionPromises = visibleTestCases.map(async (tc, index) => {
            // Format input
            let input = '';
            if (typeof tc.input === 'object' && tc.input !== null) {
                const values = [];
                for (const inputVar of (question.inputVariables || [])) {
                    const value = tc.input[inputVar.variable];
                    if (Array.isArray(value)) {
                        values.push(value.length);
                        values.push(...value);
                    } else {
                        values.push(value);
                    }
                }
                input = values.join(' ');
            } else if (typeof tc.input === 'string') {
                input = tc.input.trim().replace(/,/g, ' ').replace(/\s+/g, ' ');
            } else {
                input = String(tc.input);
            }
            
            const expectedOutput = removeTrailingWhitespace(tc.output.trim());

            try {
                const response = await fetch(`${judge0Url}/submissions?base64_encoded=false&wait=true`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        source_code: wrappedCode,
                        language_id: judge0Id,
                        stdin: input,
                        expected_output: expectedOutput,
                    }),
                });

                const result = await response.json();
                console.log(`Judge0 response for test case ${index + 1}:`, JSON.stringify(result, null, 2));
                
                const isPassed = result.status && result.status.id === 3;

                return {
                    testCase: index + 1,
                    passed: isPassed,
                    input: input,
                    expectedOutput: expectedOutput,
                    actualOutput: removeTrailingWhitespace(result.stdout || ''),
                    error: result.stderr || result.compile_output || null,
                    status: result.status ? result.status.description : "Unknown",
                    executionTime: result.time || null,
                    memory: result.memory || null
                };

            } catch (err) {
                console.error("Judge0 execution error:", err);
                return {
                    testCase: index + 1,
                    passed: false,
                    input: input,
                    expectedOutput: expectedOutput,
                    actualOutput: "",
                    error: "Execution failed: " + err.message,
                    status: "System Error",
                };
            }
        });

        const testResults = await Promise.all(executionPromises);
        const passedCount = testResults.filter(r => r.passed).length;

        return res.json({
            success: true,
            message: 'Code executed successfully',
            data: {
                totalTests: visibleTestCases.length,
                passedTests: passedCount,
                failedTests: visibleTestCases.length - passedCount,
                results: testResults,
                isFullyPassed: passedCount === visibleTestCases.length
            }
        });

    } catch (error) {
        console.error('Error running code:', error);
        return res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

module.exports = {
    startContest,
    manageViolations,
    checkTestId,
    getContestLanding,
    getContestData,
    submitSolution,
    endContest,
    startTest,
    runCode
};
