import fs from "fs";
import admin from "firebase-admin";
import "dotenv/config.js";
import express from "express";
import "../config/database.js";
import { Blog } from "../models/Blog.js";
import logger from "morgan";
import cors from "cors";

//connect to firebase project
const credentials = JSON.parse(fs.readFileSync("./credentials.json"));
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

// fake db that will make development much easier,later will replace it with mongodb
const articlesInfo = [
  { name: "learn-react", upvotes: 0, comments: [] },
  { name: "learn-node", upvotes: 0, comments: [] },
  { name: "mongodb", upvotes: 0, comments: [] },
];

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.use(async (req, res, next) => {
  const { authToken } = req.headers;

  if (auth) {
    try {
      req.user = await admin.auth().verifyIdToken(authToken);
    } catch (e) {
      res.sendStatus(400);
    }
  }
  next();
});

app.get("/api/articles/:name", async (req, res) => {
  console.log("get request received.");
  const { name } = req.params;
  const { uid } = req.user;
  const blog = await Blog.findOne({ name });
  if (blog) {
    const upvoteIds = article.upvoteIds || [];
    article.canUpvote = uid && !upvoteIds.include(uid);
    res.json(blog);
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

  const blog = await Blog.findOne({ name });
  if (blog) {
    const upvoteIds = article.upvoteIds || [];
    const cnaUpvote = uid && !upvoteIds.include(uid);
    if (canUpvote) {
      const article = await Blog.findOneAndUpdate(
        { name },
        { $inc: { upvotes: 1 }, $push: { upvoteIds: uid } },
        { new: true }
      );
    }
  }

  res.json(article);
});

app.post("/api/articles/:name/comments", async (req, res) => {
  const { name } = req.params;
  const { text } = req.body;
  const { email } = req.user;

  const updatedBlog = await Blog.findOneAndUpdate(
    { name },
    { $push: { comments: { postedBy: email, text } } },
    { new: true }
  );
  res.json(updatedBlog);
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
