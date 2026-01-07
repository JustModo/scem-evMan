const express = require('express')
const { requireAuth, options } = require('../middlewares/authM')
const { connectDB } = require("../controllers/dbCon")
const Contest = require("../models/Contest")
const Question = require("../models/Question")
const router = express.Router();
router.get('/pgs', requireAuth({ options }), (req, res) => { res.send("I'm up") })
router.post('/test/create', async (req, res) => {
    const { title, description, startTime, endTime, questions, vis, type } = req.body;
    if (!title) return res.status(500).json({ success: false, message: "Name required" });
    try {
        await connectDB();
        const ques = [];
        if (questions) for (q of questions) {
            if (q.old) {
                ques.push(q.id)
                continue
            }
            var t = new Question({
                type: q.type, title: q.title, correctAnswer: q.correctAnswer, testcases: q.testcases, marks: q.marks
            })
            await t.save();
            ques.push(t._id)
        }
        const newContest = new Contest({
            title, description, startTime: new Date(), endTime: new Date(), questions: ques, type //just for testing, will rep with actual start and end
        })
        await newContest.save();
        return res.status(200).json({ success: true, contestID: newContest._id })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: err })
    }
})
//TODO

const Submission = require("../models/Submissions")

router.get('/stats', async (req, res) => {
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
            Submission.countDocuments({}), // Count of all submissions implies all participants who started
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
});

module.exports = router;