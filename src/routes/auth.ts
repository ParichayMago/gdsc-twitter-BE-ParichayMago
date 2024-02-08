import { Router } from "express";
import { validate , userValidationRules } from "../middleware/validation/validator";
import { registerController } from "../controllers/auth.controller";
const authRouter = Router()

authRouter.post("/create" ,userValidationRules() , validate , registerController )

export default authRouter