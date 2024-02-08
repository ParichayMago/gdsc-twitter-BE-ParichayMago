import { Response , Request } from "express"
import { SignUpBody } from "../types/types"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/User"

export const registerController = async (req:Request<{} , {} , SignUpBody> , res:Response)=>{
  try{
    const {name , email, password , age} = req.body
    let secPass = await bcrypt.hash(password, 10);


    let existingUser = await User.findOne({email})
    if(existingUser){
      return res.status(400).json({error:"user already created"})
    }else{
      const user = new User({
        name , email , password : secPass , age
      });


      const data = {
        user: {
          id: user.id,
        },
      };

      let token = jwt.sign(data, "$eldenRing");
      user.token = token
      await user.save()
      return res.json({"message": "done"})
    }

  }catch(e){
    console.error("Internal Server Error" , e)
  }
}