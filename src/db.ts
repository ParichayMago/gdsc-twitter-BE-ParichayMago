import mongoose from "mongoose";

export const connectMongo = async()=>{
  try{
    await mongoose.connect("mongodb://127.0.0.1:27017/twitterclone")
    console.log("connected to Mongo")
  }catch(e){
    console.error("cannot connect to Mongo ", e)
  }
}