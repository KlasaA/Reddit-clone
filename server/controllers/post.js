import Post from "../models/post.js";
import User from "../models/user.js";
import Comment from "../models/comment.js";
import { mapCommentsToPosts } from "./comments.js";
export const createPost = async (req, res) => {
  const { content, userId } = req.body;
  try {
    const newPost = await Post.create({
      content,
      comments: [],
      userId,
    });
    res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    let posts = await Post.find({}).lean(); // find all posts
    posts = await mapCommentsToPosts(posts);

    const postUsers = await User.find({
      _id: { $in: [...new Set(posts.map((post) => post.userId))] },
    }).lean(); // pronalazim sve usere iz fetchanih postova

    const mappedPosts = posts.map((post) => {
      const postUser = postUsers.find(
        (user) => String(user._id) == post.userId
      );
      post.user = postUser;
      return post;
    }); // map user model to post

    res.status(200).json(mappedPosts.reverse());
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const deletePost = await Post.findOne({ _id: req.params.id });
  if (deletePost.comments.length > 0) {
    await Comment.remove({
      _id: {
        $in: deletePost.comments,
      },
    });
  }
  Post.findByIdAndRemove({ _id: req.params.id }).then(function (post) {
    res.send(post);
  });
};

//mapiram kroz sve postove
//usporedim od svakog posta comments id sa komentarima u bazi
//vratim sve te komentare na frontend
