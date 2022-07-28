import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  content: {
    image: { type: String },
    title: { type: String },
  },
  comments: { type: [String] },
  userId: { type: String },
});

export default mongoose.model("Post", postSchema);
