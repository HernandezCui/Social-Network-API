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

  
