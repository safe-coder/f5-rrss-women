import express from "express";

const app = express();

const port = 5000;

app.get("/", (req, res) => {
  res.status(500).send("hello world!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
