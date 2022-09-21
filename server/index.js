import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import postRoute from "./routes/post.js";
import commentRoute from "./routes/comment.js";
import favoriteRoute from "./routes/favorite.js";
import followingRoute from "./routes/following.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
app.get("/", (req, res) => {
  res.send("app is running");
});

app.use("/users", userRoutes);
app.use("/posts", postRoute);
app.use("/comments", commentRoute);
app.use("/favorites", favoriteRoute);
app.use("/following", followingRoute);

app.listen(process.env.PORT || 4000, () =>
  console.log("PORT:", process.env.PORT)
);

mongoose.connect(
  "mongodb+srv://Klasa:Klasa159357000@cluster0.chijg.mongodb.net/Users?retryWrites=true&w=majority"
);
