import "dotenv/config.js";
import express from "express";
import "../config/database.js";
import { Blog } from "../models/Blog.js";
// fake db that will make development much easier,later will replace it with mongodb
const articlesInfo = [
  { name: "learn-react", upvotes: 0, comments: [] },
  { name: "learn-node", upvotes: 0, comments: [] },
  { name: "mongodb", upvotes: 0, comments: [] },
];

const app = express();

app.use(express.json());

app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;
  const blog = await Blog.findOne({ name });
  if (blog) {
    res.json(blog);
  } else {
    res.sendStatus(404);
  }
});

app.put("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;
  const article = await Blog.findOneAndUpdate(
    { name },
    { $inc: { upvotes: 1 } },
    { new: true }
  );
  res.json(article);
});

app.post("/api/articles/:name/comments", (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;
  const article = articlesInfo.find((article) => article.name === name);
  if (article) {
    article.comments.push({ postedBy, text });
    res.send(article.comments);
  } else {
    res.send("The article doesn't exist");
  }
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
