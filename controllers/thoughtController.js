const Thought = require('../models/Thought');

exports.getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    res.status(201).json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.json({ message: 'Thought deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createReaction = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    thought.reactions.push(req.body);
    await thought.save();
    res.json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteReaction = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    const reactionIndex = thought.reactions.findIndex(reaction => reaction._id.toString() === req.body.reactionId);
    if (reactionIndex === -1) {
      res.status(404).json({ message: 'Reaction not found in thought' });
      return;
    }
    thought.reactions.splice(reactionIndex, 1);
    await thought.save();
    res.json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
};