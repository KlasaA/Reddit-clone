
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  content: {
    image: { type: String, required: true },
    title: { type: String, required: true },
  },
  timeStamp: { type: Date },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Post", postSchema);

