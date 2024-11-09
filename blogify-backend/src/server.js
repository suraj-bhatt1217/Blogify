import fs from "fs";
import admin from "firebase-admin";
import "dotenv/config.js";
import express from "express";
import "../config/database.js";
import { Blog } from "../models/Blog.js";
import logger from "morgan";
import cors from "cors";
import path from "path";

//connect to firebase project
const credentials = JSON.parse(fs.readFileSync("./credentials.json"));
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const app = express();

//
app.use(
  cors({
    origin: "https://blogify-t7nc.vercel.app",
    credentials: true,
  })
);

https: app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../blogify-fe/dist")));

app.use(async (req, res, next) => {
  console.log("Received headers:", req.headers);
  const { authtoken } = req.headers;

  if (authtoken) {
    try {
      req.user = await admin.auth().verifyIdToken(authtoken);
    } catch (e) {
      return res.sendStatus(400);
    }
  }
  req.user = req.user || {};
  next();
});

app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;
  const blog = await Blog.findOne({ name });
  if (blog) {
    const upvoteIds = blog.upvoteIds;
    const canUpvote = uid && !upvoteIds.includes(uid);
    console.log("user can upvote: ", canUpvote);
    res.json({ ...blog._doc, canUpvote });
  } else {
    res.sendStatus(404);
  }
});

app.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
});

app.put("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;

  const blog = await Blog.findOne({ name });
  if (blog) {
    const upvoteIds = blog.upvoteIds;
    console.log(upvoteIds);
    console.log(uid);
    const canUpvote = uid && !upvoteIds.includes(uid);
    if (canUpvote) {
      const updatedblog = await Blog.findOneAndUpdate(
        { name },
        { $inc: { upvotes: 1 }, $push: { upvoteIds: uid } },
        { new: true }
      );
      res.json(updatedblog);
    } else {
      res.status(403).send("You have already upvoted this article.");
    }
  }
});

app.post("/api/articles/:name/comments", async (req, res) => {
  const { name } = req.params;
  const { text } = req.body;
  console.log(req.user);

  const updatedBlog = await Blog.findOneAndUpdate(
    { name },
    { $push: { comments: { postedBy: email, text } } },
    { new: true }
  );
  if (updatedBlog) {
    res.json(updatedBlog);
  } else {
    res.send("That article doesn't exist!");
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../blogify-fe/dist/index.html"));
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
