import User from "../models/user.js";
import Post from "../models/post.js";

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
    let posts = await Post.find({ _id: { $in: favoriteList } })
      .populate("userId")
      .populate("comments")
      .populate({ path: "comments", populate: { path: "userId" } })
      .populate({ path: "comments", populate: { path: "replies" } })
      .populate({
        path: "comments",
        populate: { path: "replies", populate: { path: "userId" } },
      }); // find all posts

    res.status(200).json(posts.reverse());
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
