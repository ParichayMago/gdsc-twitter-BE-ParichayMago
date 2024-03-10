import { Router } from "express";
import { validate , tweetValidationRules } from "../middleware/validation/validator";
import { insertTweet , deleteTweet , update , fetchAll , fetchById, allTweetsOfTheUser } from "../controllers/tweet.controller";
import { authenticateUser } from "../middleware/authentication/authentication";
const tweetRouter = Router()

tweetRouter.post("/create" ,tweetValidationRules() , validate , authenticateUser , insertTweet )
tweetRouter.get("/fetch/all" ,tweetValidationRules() , validate , authenticateUser  ,  fetchAll )
tweetRouter.get("/fetch/:id" ,tweetValidationRules() , validate ,authenticateUser  ,  fetchById )
tweetRouter.get("/fetch/:Userid" ,tweetValidationRules() , validate ,authenticateUser  ,  allTweetsOfTheUser)
tweetRouter.delete("/delete/:id" ,tweetValidationRules() , validate ,authenticateUser  ,  deleteTweet )
tweetRouter.put("/update/:id" ,tweetValidationRules() , validate ,authenticateUser  ,  update )


export default tweetRouter