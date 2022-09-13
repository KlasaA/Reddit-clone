import express from "express";

import {
  addFavoritePost,
  deleteFavoritePost,
  getFavoriteList,
  getFavoritePosts,
} from "../controllers/favorites.js";
const router = express.Router();

router.post("/", addFavoritePost);
router.delete("/:userId/:postId", deleteFavoritePost);
router.get("/:userId", getFavoriteList);
router.get("/favorite-posts/:userId", getFavoritePosts);

export default router;
