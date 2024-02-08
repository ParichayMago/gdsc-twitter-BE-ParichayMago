import {Schema , model} from "mongoose";


export interface IUser {
  name:string
  email : string
  password : string
  token: string
  dob: Date
  bio: string
}


const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: {type : String , required: true },
  token : {type : String },
  dob: {type : Date , required: true },
  bio: {type : String , required: true},


})

export const User = model<IUser>("user" , userSchema)