import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../models/User";
import { IUser } from "../../models/User";


export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Missing token" });
    }


    const decoded: any = jwt.verify(token, "$eldenRing");

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }


    const userId = decoded.user.id;


    const user: IUser | null = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }


    req.userId = userId;

    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
