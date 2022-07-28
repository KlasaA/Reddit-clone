import Post from "../models/post.js";

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
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
