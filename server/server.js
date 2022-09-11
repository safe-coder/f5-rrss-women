import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieparser from "cookie-parser";
import authRouter from "./router/authRouter.js";
import userRouter from "./router/userRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieparser());

//routes

app.use('/api', authRouter)
app.use('/api', userRouter)

const port = process.env.PORT || 5000;
const URL = process.env.MONGO_URI;

mongoose.connect(
  URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) throw error;
    console.log("db is connected");
  }
);



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
