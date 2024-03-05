import { Response , Request } from "express"
import { SignUpBody, loginBody } from "../types/types"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/data/User"


// Registration of the user
export const registerController = async (req:Request<{} , {} , SignUpBody> , res:Response)=>{
  try{
    const {name , email, password, dob, bio} = req.body

    let secPass = await bcrypt.hash(password, 10);


    let existingUser = await User.findOne({email})
    if(existingUser){
      return res.status(409).json({error:"user already created"})
    }else{
      const user = new User({
        name , email , password : secPass , dob, bio
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      let token = jwt.sign(data, "$eldenRing");
      await user.save()
      res.cookie('token' , token , {httpOnly:true})
      return res.json({msg : "user created" , token , details : user})
    }

  }catch(e){
    console.error("Internal Server Error" , e)
  }
}

export const loginController = async(req : Request <{} , {} , loginBody>, res : Response)=>{

    const creds = req.body

     let user = await User.findOne({email : creds.email})
     if(!user){
       return res.json({error:"please enter correct creds"})
     }

     const passCompare = await bcrypt.compare(creds.password , user.password)
     if(!passCompare){
       return res.json({error:"please enter correct creds"})
     }

     const data = {
       user : {
         id : user.id
       }
     }
     let token = jwt.sign(data, '$love$eldenring');
     return res.json({token});

}