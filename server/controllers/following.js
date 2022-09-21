import User from "../models/user.js";
import Post from "../models/post.js";

export const addFollowedUser = async (req, res) => {
  const { userId, followedUserId } = req.body;

  try {
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { followedUsers: followedUserId } },
      { new: true }
    );
    res.status(201).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFollowedUser = async (req, res) => {
  const { userId, followedUserId } = req.params;

  try {
    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { followedUsers: followedUserId } },
      { new: true }
    );
    res.status(201).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFollowedUsersList = async (req, res) => {
  try {
    const { userId } = req.params;
    let followingList = await User.findById(userId);
    res.status(201).json(followingList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFollowedPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    let currentUser = await User.findById(userId).lean();
    const followedUsersList = currentUser.followedUsers;
    let posts = await Post.find({ userId: { $in: followedUsersList } })
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
