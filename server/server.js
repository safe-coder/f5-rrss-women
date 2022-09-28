import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieparser from "cookie-parser";
import authRouter from "./router/authRouter.js";
import userRouter from "./router/userRouter.js";
import postRouter from "./router/postRouter.js";
import commentRouter from "./router/commentRoute.js";
import http from "http";
import { Server } from "socket.io";
import socketServer from "./socketServer.js";



dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieparser());

//routes
const httpServer = http. createServer(app);
const io = new Server(httpServer);



app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', postRouter)
app.use('/api', commentRouter)

const port = process.env.PORT || 5000;
const URL = process.env.MONGO_URI;

io.on('connection', socket=>{
 socketServer(socket);
})

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



httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`);
});