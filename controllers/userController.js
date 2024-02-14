const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addFriend = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);
    if (!user || !friend) {
      res.status(404).json({ message: 'User or friend not found' });
      return;
    }
    user.friends.push(friend._id);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.removeFriend = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friendIndex = user.friends.indexOf(req.params.friendId);
    if (friendIndex === -1) {
      res.status(404).json({ message: 'Friend not found in user\'s friend list' });
      return;
    }
    user.friends.splice(friendIndex, 1);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};