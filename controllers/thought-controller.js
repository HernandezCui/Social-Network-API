const { Thought, User } = require("../models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .populate("userId")
      .sort({ createdAt: -1 })
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(400).json(err));
  },

  getThoughtById({ params }, res) {
    Thought.findById(params.thoughtId)
      .populate("userId")
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought found by that id!" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.status(400).json(err));
  },

  addThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) =>
        User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        )
      )
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },

  updateThought({ params, body }, res) {
    Thought.findByIdAndUpdate(
      params.thoughtId,
      { $set: body },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.status(400).json(err));
  },

  removeThought({ params }, res) {
    Thought.findByIdAndRemove(params.thoughtId)
      .then((thought) =>
        User.findOneAndUpdate(
          { _id: thought.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        )
      )
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },

  addReaction({ params, body }, res) {
    Thought.findByIdAndUpdate(
      params.thoughtId,
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((thought) => res.json(thought))
      .catch((err) => res.json(err));
  },

  removeReaction({ params }, res) {
    Thought.findByIdAndUpdate(
      params.thoughtId,
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((thought) => res.json(thought))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
