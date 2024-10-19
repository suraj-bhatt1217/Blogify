import express from "express";

// fake db that will make development much easier,later will replace it with mongodb
const articlesInfo = [
  { name: "learn-react", upvotes: 0 },
  { name: "learn-node", upvotes: 0 },
  { name: "mongodb", upvotes: 0 },
];

const app = express();

app.use(express.json());

app.put("/api/articles/:name/upvote", (req, res) => {
  const { name } = req.params;
  const article = articlesInfo.find((article) => article.name === name);
  if (article) {
    article.upvotes += 1;
    res.send(`The ${name} article has ${article.upvotes} upvotes.`);
  }
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});