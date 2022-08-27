import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  content: {
    image: { type: String, required: true },
    title: { type: String, required: true },
  },
  comments: { type: [String] },
  userId: { type: String },
});

export default mongoose.model("Post", postSchema);

