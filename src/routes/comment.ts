import { Router } from "express";
import { getComment, createComment } from "../controllers/comment.controller";
import { validate, tweetValidationRules } from "../middleware/validation/validator";
import { authenticateUser } from "../middleware/authentication/authentication";
const commentRouter = Router()


// Id (in the params ) is the id of tweet commenting to. Comments are also a tweet!!
commentRouter.post("/:id", tweetValidationRules(), validate, authenticateUser, createComment)
commentRouter.get("/:id",  getComment)

export default commentRouter