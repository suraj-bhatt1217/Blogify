import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("response");
});

app.listen(3000, (req, res) => {
  console.log("server listening on port 8000");
});
