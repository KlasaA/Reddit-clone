import express from "express";
import {
  addComment,
  deleteComment,
  editComment,
} from "../controllers/comments.js";

const router = express.Router();

router.post("/", addComment);
router.delete("/:id/:postId", deleteComment);
router.put("", editComment);
export default router;
