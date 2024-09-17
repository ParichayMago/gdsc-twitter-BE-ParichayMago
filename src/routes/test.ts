import {Router} from "express"
const testRouter = Router();

testRouter.post("/", (req, res)=> {
  console.log(req.body)
  return console.log("TESTING, HELLO FROM BACKEND. API HIT")
})

export default testRouter;