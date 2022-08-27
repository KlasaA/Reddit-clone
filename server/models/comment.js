import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  userId: { type: String },
  timeStamp: { type: Date },
  replays: { type: [String] },
});

export default mongoose.model("Comment", commentSchema);
