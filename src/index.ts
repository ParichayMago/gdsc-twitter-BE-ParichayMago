import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth"
import { connectMongo } from "./db";
import cookieParser from "cookie-parser"
import tweetRouter from "./routes/tweet";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(cookieParser())
app.use(express.json());
connectMongo()
app.get("/", (req : Request, res : Response) => {
  res.json({"message" : "gdsc"});
});
app.use("/api/auth" , authRouter )
app.use("/api/tweet" , tweetRouter )
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});