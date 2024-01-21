const express = require("express");
const router = express.Router();

const {
  fetchAllUsers,
  getUserDetails,
  createNewUser,
  modifyUserDetails,
  eliminateUser,
  befriendUser,
  unfriendUser,
} = require("../../controllers/user-controller");

// /api/people
router.route("/").get(fetchAllUsers).post(createNewUser);

// /api/people/:personId
router.route("/:personId").get(getUserDetails).put(modifyUserDetails).delete(eliminateUser);

// /api/people/:personId/friends/:friendId
router.route("/:personId/friends/:friendId").post(befriendUser).delete(unfriendUser);

module.exports = router;