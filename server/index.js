import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import postRoute from "./routes/post.js";
import commentRoute from "./routes/comment.js";
import favoriteRoute from "./routes/favorite.js";
import followingRoute from "./routes/following.js";
import bodyParser from "body-parser";
require("dotenv").config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use("/users", userRoutes);
app.use("/posts", postRoute);
app.use("/comments", commentRoute);
app.use("/favorites", favoriteRoute);
app.use("/following", followingRoute);

app.listen(process.env.PORT || 2000, () =>
  console.log("Example app listening on port 2000!")
);

mongoose.connect(
  "mongodb+srv://Klasa:Klasa159357000@cluster0.chijg.mongodb.net/Users?retryWrites=true&w=majority"
);
