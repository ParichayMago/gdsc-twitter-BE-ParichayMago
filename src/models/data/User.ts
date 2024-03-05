import mongoose, {Mongoose, ObjectId, Schema , model} from "mongoose";


export interface IUser {
  _id: ObjectId,
  name:string
  email : string
  password : string
  dob?: Date
  bio?: string
}


const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: {type : String , required: true },
  dob: {type : Date , required: false },
  bio: {type : String , required: false},


})

export const User = model<IUser>("user" , userSchema)