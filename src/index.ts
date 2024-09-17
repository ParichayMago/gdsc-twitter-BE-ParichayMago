import express, { Express, Request, Response } from "express";
import dotenv from  "dotenv"
import authRouter from "./routes/auth"
import { connectMongo } from "./db";
import cookieParser from "cookie-parser"
import tweetRouter from "./routes/tweet";
import userRouter from "./routes/user"
import cors from "cors"
import commentRouter from "./routes/comment";
import testRouter from "./routes/test";
import { PrismaClient } from "@prisma/client";

dotenv.config();
export const prisma = new PrismaClient()

const app: Express = express();
const port = process.env.PORT || 4000;
app.use(cors())
app.use(cookieParser())
app.use(express.json());
// connectMongo()
app.get("/", (req : Request, res : Response) => {
  res.json({"message" : "gdsc"});
});
app.use("/api/auth" , authRouter )
app.use("/api/user", userRouter)
app.use("/api/tweet" , tweetRouter)
app.use("/api/comment", commentRouter)
app.use("/api/test", testRouter);
app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});