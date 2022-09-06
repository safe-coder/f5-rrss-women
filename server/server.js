import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import cookieparser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieparser());

const port = process.env.PORT || 5000;
const URL = process.env.MONGO_URI;

mongoose.connect(URL,
  {
  
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (error) => {
  if (error) throw error;
  console.log('db is connected')
})


app.get("/", (req, res) => {
  res.status(500).send("hello world!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
