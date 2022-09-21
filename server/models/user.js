
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  admin: { type: Boolean, required: true },
  favoritePosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  followedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

export default mongoose.model("User", userSchema);


// kad stisnem submit reply
// posaljem commentID
// backend provjeri je li posla comment id
// ako je poslan koment id
// backend spremi newcomment iD u array od komentara sa tim commnetIDom

// ukoliko je poslan ID komentara ID od novog komentara se "pusha" u polje od koment

// ako korisnik stvara reply na postoječi komentar. komentID od tog postoječeg komentara salje se na backend 
//backend provejrava je li commnet id poslan ukolik je naš reply stavlja se pod komentar na koji odgovaramo
