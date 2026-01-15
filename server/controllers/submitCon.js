const Submission = require("../models/Submissions");
const { languageMap } = require("../utils/languageMap");
const { getJudge } = require("@pomelo/code-gen");

// Helper function to remove trailing whitespace/newlines from output
const removeTrailingLineCommands = (output) => {
    if (typeof output !== 'string') return output;
    return output.replace(/\s+$/g, '');
};

// Save MCQ answer and calculate score
const saveMCQ = async (req, res) => {
    try {
        const { contestId, questionId, answer } = req.body;
        const userId = req.user._id;

        if (!contestId || !questionId || !answer) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const questionDoc = req.question;

        let score = 0;
        const submittedAns = Array.isArray(answer) ? answer[0] : answer;
        if (submittedAns === questionDoc.correctAnswer) {
            score = questionDoc.marks || 0;
        }

        // Find existing submission or create new one for this contest/user
        let submission = await Submission.findOne({ contest: contestId, user: userId });

        if (!submission) {
            submission = new Submission({
                contest: contestId,
                user: userId,
                submissions: [],
            });
        }

        // Update or add the submission entry for this specific question
        const existingIndex = submission.submissions.findIndex(
            (s) => s.question.toString() === questionId
        );

        const submissionEntry = {
            question: questionId,
            answer: Array.isArray(answer) ? answer : [answer],
            score: score,
            submittedAt: new Date(),
        };

        if (existingIndex > -1) {
            submission.submissions[existingIndex] = {
                ...submission.submissions[existingIndex],
                ...submissionEntry
            };
        } else {
            submission.submissions.push(submissionEntry);
        }

        // Recalculate total score for the entire contest
        submission.totalScore = submission.submissions.reduce((acc, curr) => acc + (curr.score || 0), 0);

        // Mark contest as completed if final submit flag is true
        if (req.body.finalSubmit) {
            submission.status = 'Completed';
        }

        await submission.save();

        return res.status(200).json({ message: "Answer saved", score: score });
    } catch (error) {
        console.error("Error saving MCQ:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Submit code, run against Judge0, and save results
const submitCode = async (req, res) => {
    try {
        const { contestId, questionId, code, language } = req.body;
        const userId = req.user._id;

        if (!contestId || !questionId || !code || !language) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Question is already fetched by the router
        const question = req.question;

        // Map language to Judge0 ID
        const judge0Id = languageMap[language.toLowerCase()];
        if (!judge0Id) {
            return res.status(400).json({ error: "Unsupported language" });
        }

        // Get the judge for the language and wrap the code
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
        } catch (err) {
            console.warn(`Could not wrap code for ${language}, using original code:`, err.message);
        }

        const testCases = question.testcases || [];
        let passedCount = 0;

        // Execute code against all test cases in parallel
        const executionPromises = testCases.map(async (tc, index) => {
            // Simple input mapping
            const input = typeof tc.input === 'string' ? tc.input : JSON.stringify(tc.input);
            // Simple output mapping
            const expectedOutput = typeof tc.output === 'string' ? tc.output : JSON.stringify(tc.output);
            
            // Encode to base64
            const base64Input = Buffer.from(input).toString('base64');
            const base64ExpectedOutput = Buffer.from(expectedOutput).toString('base64');
            const base64SourceCode = Buffer.from(wrappedCode).toString('base64');
            
            try {
                const judge0Url = process.env.JUDGE0_URL || 'http://localhost:2358';
                const response = await fetch(`${judge0Url}/submissions?base64_encoded=true&wait=true`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        source_code: base64SourceCode,
                        language_id: judge0Id,
                        stdin: base64Input,
                        expected_output: base64ExpectedOutput,
                    }),
                });
                const result = await response.json();
                const isPassed = result.status && result.status.id === 3; // ID 3 is 'Accepted'

                // Decode base64 outputs
                const decodedStdout = result.stdout ? Buffer.from(result.stdout, 'base64').toString('utf-8') : '';
                const decodedStderr = result.stderr ? Buffer.from(result.stderr, 'base64').toString('utf-8') : '';
                const decodedCompileOutput = result.compile_output ? Buffer.from(result.compile_output, 'base64').toString('utf-8') : '';

                return {
                    testCase: index + 1,
                    passed: isPassed,
                    input: input,
                    expectedOutput: expectedOutput,
                    actualOutput: removeTrailingLineCommands(decodedStdout || decodedStderr || decodedCompileOutput || ""),
                    error: decodedStderr || decodedCompileOutput || (result.status ? result.status.description : "Unknown Error"),
                    status: result.status ? result.status.description : "Unknown",
                };

            } catch (err) {
                console.error(`Judge0 execution error for test case ${index + 1}:`, err.message);
                
                return {
                    testCase: index + 1,
                    passed: false,
                    input: input,
                    expectedOutput: expectedOutput,
                    actualOutput: "",
                    error: `Execution failed: ${err.message}`,
                    status: "System Error",
                };
            }
        });

        const testCaseResults = await Promise.all(executionPromises);
        // Calculate score based on percentage of passed test cases
        passedCount = testCaseResults.filter(r => r.passed).length;
        const totalTestCases = testCases.length;
        const score = totalTestCases > 0 ? (passedCount / totalTestCases) * (question.marks || 0) : 0;

        // Determine overall status (Accepted, Wrong Answer, etc.)
        let overallStatus = "Accepted";
        if (passedCount < totalTestCases) {
            if (testCaseResults.some(r => r.status && r.status.includes("Compilation"))) {
                overallStatus = "Compilation Error";
            } else if (testCaseResults.some(r => r.status && r.status.includes("Time Limit"))) {
                overallStatus = "Time Limit Exceeded";
            } else {
                overallStatus = "Wrong Answer";
            }
        }

        // Find or create submission document
        let submission = await Submission.findOne({ contest: contestId, user: userId });
        if (!submission) {
            submission = new Submission({
                contest: contestId,
                user: userId,
                submissions: [],
            });
        }

        // Update submission entry with code, results, and status
        const existingIndex = submission.submissions.findIndex(
            (s) => s.question.toString() === questionId
        );

        const submissionEntry = {
            question: questionId,
            code: code,
            language: language,
            status: overallStatus,
            testCaseResults: testCaseResults,
            score: score,
            submittedAt: new Date(),
        };

        if (existingIndex > -1) {
            submission.submissions[existingIndex] = { ...submission.submissions[existingIndex], ...submissionEntry };
        } else {
            submission.submissions.push(submissionEntry);
        }

        // Update total score
        submission.totalScore = submission.submissions.reduce((acc, curr) => acc + (curr.score || 0), 0);

        if (req.body.finalSubmit) {
            submission.status = 'Completed';
        }

        await submission.save();

        return res.status(200).json({
            message: "Submission processed",
            results: testCaseResults,
            score: score,
            overallStatus: overallStatus
        });

    } catch (error) {
        console.error("Error submitting code:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { saveMCQ, submitCode };
