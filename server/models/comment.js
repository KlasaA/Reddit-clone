import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  userID: { type: String },
  timeStamp: { type: Date },
});

export default mongoose.model("Comment", commentSchema);
