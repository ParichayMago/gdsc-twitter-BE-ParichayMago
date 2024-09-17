import { Response , Request } from "express"
import { HttpStatusCode, SignUpBody, loginBody } from "../types/types"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/data/User"
import { PrismaClient } from "@prisma/client"
import { error } from "console"

const prisma = new PrismaClient();
const saltRounds = process.env.SALT_ROUNDS;
const passkey = process.env.bcrypt_passkey;


// Registration of the user
export const registerController = async (
  req:Request<{} , {} , SignUpBody & {validationImage: HTMLImageElement}> ,
  res:Response
  )=>{
  try{
// name, email, password, username,  college, bio, pfp
    const data = req.body

    // let secPass = await bcrypt.hash(data.password, 10);

    let existingUserEmail = await prisma.user.findUnique({where: {email: data.email},});

    if(existingUserEmail) {
      return res.status(400).json({error: "user already registered", success: false})
    }

    let existingUsername = await prisma.user.findUnique({where: {username: data.email}})
    if(existingUsername) {
      return res.status(400).json({error: "username alreday taken, Choose another username", success: false});
    }


    if(!data.email.search("@gtbit") && !data.validationImage) {
      return res.status(400).json({error: "Enter college email id or college id card for User Authentication"});
    }
    
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const newUser = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword, 
      }
    });
    const userJwt = {id: newUser.id}
    let token = jwt.sign(userJwt, "abc");
    res.cookie('token' , token , {httpOnly:true})
    return res.json({msg : "user created" , token , details : newUser})
  }catch(e){
    console.error("Internal Server Error" , e)
    return res.status(500).json({ error: "Internal server error", success: false });
  }
}

export const loginController = async(req : Request <{} , {} , loginBody>, res : Response)=>{
  try{

    const creds = req.body
    
    let user = await prisma.user.findUnique({where: {email: creds.email}})
    if(!user){
      return res.status(HttpStatusCode.NotFound).json({error:"no email found, try logging in"})
    }

    
    const passCompare = await bcrypt.compare(creds.password , user.password)
    if(!passCompare){
      return res.status(HttpStatusCode.NotFound).json({error:"please enter correct creds"})
    }

    const payloadObj  = {
      id: user.id 
    } 
    let token = jwt.sign(payloadObj, "abc", {expiresIn: "1d"});
    res.cookie('token' , token , {httpOnly:true})
    return res.status(HttpStatusCode.Accepted).json({message: "login sucessfull", token});
} catch(e){
  return res.status(HttpStatusCode.InternalServerError).send(e)
  }  
}