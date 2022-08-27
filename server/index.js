import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import postRoute from "./routes/post.js";
import commentRoute from "./routes/comment.js";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use("/users", userRoutes);
app.use("/posts", postRoute);
app.use("/comments", commentRoute);

app.listen(2000, () => console.log("Example app listening on port 2000!"));

mongoose.connect(
  "mongodb+srv://Klasa:Klasa159357000@cluster0.chijg.mongodb.net/Users?retryWrites=true&w=majority"
);
