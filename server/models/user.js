import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  admin: { type: Boolean, required: true },
  favoritePosts: { type: [String] },
});

export default mongoose.model("User", userSchema);
