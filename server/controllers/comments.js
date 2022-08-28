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
  try {
    const deleteComment = await Comment.find({ _id: req.params.id }).lean();
    if (deleteComment[0].replies.length > 0) {
      await Comment.remove({
        _id: {
          $in: deleteComment[0].replies,
        },
      });
    }
    await Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $pull: { comments: { $in: [req.params.id] } } },
      { new: true }
    );

    Comment.findByIdAndRemove({ _id: req.params.id }).then(function (comment) {
      res.send(comment).json();
    });
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

export const mapCommentsToPosts = async (posts) => {
  const commentIds = posts.map((post) => post.comments); // dohvacam sve comment Id-ove

  const comments = await Comment.find({
    _id: { $in: commentIds.flat() },
  }).lean(); // dohvacam sve komentare

  const replyIds = compact(comments.map((comment) => comment.replies));

  const replies = await Comment.find({
    _id: { $in: replyIds.flat() },
  }).lean();

  const commentUsers = await User.find({
    _id: { $in: [...new Set(comments.map((comment) => comment.userId))] },
  }).lean(); // dohvačam sve usere pomoču unique ID-e ova na komentarima

  const replyUsers = await User.find({
    _id: { $in: [...new Set(replies.map((reply) => reply.userId))] },
  }).lean(); // dohvačam sve usere pomoču unique ID-e ova na komentarima

  replies.forEach((reply, idx) => {
    replies[idx].user = replyUsers.find(
      (user) => reply.userId === String(user._id)
    );
  });

  comments.forEach((comment, idx) => {
    comments[idx].user = commentUsers.find(
      (user) => comment.userId === String(user._id)
    );

    comment.replies.forEach((id, index) => {
      comments[idx].replies[index] = replies.find(
        (comment) => comment._id == id // zamijenio sam comments iD sa objektom comment
      );
    });
  });

  posts.forEach((post, idx) => {
    post.comments.forEach((id, index) => {
      posts[idx].comments[index] = comments.find(
        (comment) => comment._id == id // zamijenio sam comments iD sa objektom comment
      );
    });
  });
  posts.forEach((post, idx) => {
    posts[idx].comments = compact(post.comments);
  });

  return posts;
};
