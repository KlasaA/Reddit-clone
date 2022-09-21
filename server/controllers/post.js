import Post from "../models/post.js";
import User from "../models/user.js";
import Comment from "../models/comment.js";

export const createPost = async (req, res) => {
  const { content, userId, timeStamp } = req.body;
  try {
    const newPost = await Post.create({
      content,
      comments: [],
      userId,
      timeStamp,
    });
    res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// rpp = resources per page
// body = JSON, raw, text, form
//query = ?varijabla=NEŠTO&varijabla2=NEŠTO2&
//params = /:userID URL-u /lsjkbfdagksb

//GET -- NEMA body
export const getPosts = async (req, res) => {
  const { page, pageSize } = req.query;

  try {
    const posts = await Post.find({})
      .sort({ timeStamp: "desc" })
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .populate("userId")
      .populate("comments")
      .populate({ path: "comments", populate: { path: "userId" } })
      .populate({ path: "comments", populate: { path: "replies" } })
      .populate({
        path: "comments",
        populate: { path: "replies", populate: { path: "userId" } },
      });
    const numberOfPosts = await Post.countDocuments();
    const numOfPages = Math.ceil(numberOfPosts / pageSize);

    res.status(200).json({ posts, numOfPages });
  } catch (error) {
    res.status(500).json({ message: error.message });
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


