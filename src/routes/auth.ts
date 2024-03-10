import { Router } from "express";
import { validate , userValidationRules, userContinuation } from "../middleware/validation/validator";
import { registerController,  loginController} from "../controllers/auth.controller";
const authRouter = Router()

authRouter.post("/create" , userValidationRules() , validate, registerController )
authRouter.post("/continue", userContinuation(), validate, loginController)

export default authRouter