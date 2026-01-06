const Contest = require('../models/Contest');


const createContest = async (req, res) => {
  try {
    const contest = new Contest(req.body);
    await contest.save();
    res.status(201).json({ message: 'Contest created successfully', contest });
  } catch (error) {
    res.status(500).json({ message: 'Error creating contest', error: error.message });
  }
};

const getAllContests = async (req, res) => {
  try {
    const contests = await Contest.find().populate('questions');
    res.json(contests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contests', error: error.message });
  }
};


const getContestById = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id).populate('questions');
    if (!contest) {
      return res.status(404).json({ message: 'Contest not found' });
    }
    res.json(contest);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contest', error: error.message });
  }
};


const updateContest = async (req, res) => {
  try {
    const updated = await Contest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Contest not found' });
    res.json({ message: 'Contest updated', updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating contest', error: error.message });
  }
};


const deleteContest = async (req, res) => {
  try {
    const deleted = await Contest.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Contest not found' });
    res.json({ message: 'Contest deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contest', error: error.message });
  }
};

module.exports = {
  createContest,
  getAllContests,
  getContestById,
  updateContest,
  deleteContest,
};
