//trebam napisani komentar spremiti u polje od posta
import Comment from "../models/comment.js";
import Post from "../models/post.js";
import User from "../models/user.js";

import lodash from "lodash";
const { compact } = lodash;

export const addComment = async (req, res) => {
  const { content, userId, timeStamp, postId, commentId } = req.body;

  try {
    const newComment = await Comment.create({
      content,
      userId,
      timeStamp,
      commentId,
    });

    if (commentId) {
      await Comment.findOneAndUpdate(
        { _id: commentId },
        { $push: { replies: newComment.id } },
        { new: true }
      );
      res.status(201).json();
    }

    await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: newComment.id } },
      { new: true }
    );

    res.status(201).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  const { commentId, replyId, postId } = req.params;
  try {
    const deleteComment = await Comment.findOne({
      _id: commentId,
    });
    if (replyId == "undefined") {
      await Comment.remove({
        _id: {
          $in: deleteComment.replies,
        },
      });
      await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { comments: { $in: [commentId] } } },
        { new: true }
      );

      Comment.findByIdAndRemove({ _id: commentId }).then(function (comment) {
        res.send(comment).json();
      });
    } else {
      await Comment.findOneAndUpdate(
        { _id: commentId },
        { $pull: { replies: { $in: [replyId] } } },
        { new: true }
      );

      Comment.findByIdAndRemove({ _id: replyId }).then(function (reply) {
        res.send(reply).json();
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editComment = async (req, res) => {
  const { updatedContent, updatedTimeStamp, commentId } = req.body;

  try {
    const editedComment = await Comment.findOneAndUpdate(
      { _id: commentId },
      { content: updatedContent, timeStamp: updatedTimeStamp },
      { upsert: true, new: true }
    );

    res.status(201).json(editedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






