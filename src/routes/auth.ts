import { Router } from "express";
import { validate , userValidationRules } from "../middleware/validation/validator";
import { registerController,  loginController} from "../controllers/auth.controller";
const authRouter = Router()

authRouter.post("/create" ,userValidationRules() , validate , registerController )
authRouter.options("/continew", userValidationRules(), validate, loginController)

export default authRouter