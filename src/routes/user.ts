import { Router } from "express";
import { validate , userValidationRules } from "../middleware/validation/validator";
import { findAndUpdateUser } from "../controllers/user.controller";

const userRouter = Router()

userRouter.put("update/:name", userValidationRules(), validate , findAndUpdateUser )

export default userRouter