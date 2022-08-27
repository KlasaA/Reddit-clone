//trebam napisani komentar spremiti u polje od posta
import Comment from "../models/comment.js";
import Post from "../models/post.js";
import User from "../models/user.js";
import lodash from "lodash";
const { compact } = lodash;

export const addComment = async (req, res) => {
  const { content, userId, timeStamp, postId } = req.body;

  try {
    const newComment = await Comment.create({
      content,
      userId,
      timeStamp,
    });

    const updatedComment = await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: newComment.id } },
      { new: true }
    );

    res.status(201).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    Comment.findByIdAndRemove({ _id: req.params.id }).then(function (comment) {
      res.send(comment);
    });

    await Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $pull: {comments:{$in:[req.params.id]}}},
      { new: true }
    );

    ;
  } catch (error) {}
};

// pronaci post pronaci u tom postovom arrayu iD i obrisati ga iz arraya

export const editComment = async (req, res) => {
  try {
    const { updatedContent, updatedTimeStamp, commentId } = req.body;
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

  const commentUsers = await User.find({
    _id: { $in: [...new Set(comments.map((comment) => comment.userId))] },
  }).lean(); // dohvačam sve usere pomoču unique ID-e ova na komentarima

  comments.forEach((comment, idx) => {
    comments[idx].user = commentUsers.find(
      (user) => comment.userId === String(user._id)
    );
  });

  posts.forEach((post, idx) => {
    post.comments.forEach((id, index) => {
      posts[idx].comments[index] = comments.find(
        (comment) => comment._id == id
      ); // zamijenio sam comments iD sa objektom comment
    });
  });
  posts.forEach((post, idx) => {
    posts[idx].comments = compact(post.comments);
  });
  return posts;
};
