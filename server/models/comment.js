import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  userId: { type: String },
  timeStamp: { type: Date },
  commentId: {type: String},
  replies: { type: [String] },
});

export default mongoose.model("Comment", commentSchema);
