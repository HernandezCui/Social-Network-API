const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../controllers/userController');
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../controllers/thoughtController');

router.route('/users')
  .get(getAllUsers)
  .post(createUser);

router.route('/users/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router.route('/users/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

router.route('/thoughts')
  .get(getAllThoughts)
  .post(createThought);

router.route('/thoughts/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route('/thoughts/:thoughtId/reactions')
  .post(createReaction)
  .delete(deleteReaction);

module.exports = router;