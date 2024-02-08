import {Schema , model} from "mongoose";


export interface IUser {
  name:string
  email : string
  age: number
  password : string
  token: string
}


const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: {type : String , required: true },
  age : {type : Number , required: true },
  token : {type : String }
})

export const User = model<IUser>("user" , userSchema)