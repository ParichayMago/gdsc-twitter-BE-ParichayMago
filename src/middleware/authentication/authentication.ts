import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../models/data/User";
import { IUser } from "../../models/data/User";
import { HttpStatusCode } from "../../types/types";


export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("token")

    if(!token) {
      return res.status(HttpStatusCode.BadRequest).json({"error": "Missing Token"})
    }
    const decoded: any = jwt.verify(token, "$eldenRing"); 

    const userId = decoded.id; 

    const user: IUser | null = await User.findById(userId); 
    
    if (!user) { 
      return res.status(404).json({ error: "User not found" });
    } 
    req.body.user= user;
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

