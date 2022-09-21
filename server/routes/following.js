import express from "express";

import {
  addFollowedUser,
  removeFollowedUser,
  getFollowedUsersList,
  getFollowedPosts
} from "../controllers/following.js";
const router = express.Router();

router.post("/", addFollowedUser);
router.get("/:userId", getFollowedUsersList);
router.delete("/:userId/:followedUserId", removeFollowedUser);
router.get("/followed-posts/:userId", getFollowedPosts);

export default router;
