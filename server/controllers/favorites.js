import User from "../models/user.js";
import Post from "../models/post.js";
import { mapCommentsToPosts } from "./comments.js";

export const addFavoritePost = async (req, res) => {
  const { userId, postId } = req.body;

  try {
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { favoritePosts: postId } },
      { new: true }
    );
    res.status(201).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFavoritePost = async (req, res) => {
  const { userId, postId } = req.params;

  try {
    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { favoritePosts: postId } },
      { new: true }
    );
    res.status(201).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFavoriteList = async (req, res) => {
  try {
    const { userId } = req.params;
    let favoriteList = await User.findById(userId);
    res.status(201).json(favoriteList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFavoritePosts = async (req, res) => {
  try {
    const { userId } = req.params;
    let currentUser = await User.findById(userId).lean();
    const favoriteList = currentUser.favoritePosts;
    let posts = await Post.find({ _id: { $in: favoriteList } }).lean(); // find all posts
    posts = await mapCommentsToPosts(posts); // add all comments and replies for that post

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


