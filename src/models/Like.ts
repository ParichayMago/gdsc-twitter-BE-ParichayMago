import mongoose, { ObjectId, Schema, model } from "mongoose";

interface ILike{
  userid : ObjectId
  tweetid : ObjectId
  likedAt : Date
}

const likeSchema = new Schema<ILike>({
  userid : {type : mongoose.Schema.Types.ObjectId , required:true},
  tweetid : {type : mongoose.Schema.Types.ObjectId , required : true},
  likedAt : {type : Date , default : Date.now}
})

export const like = model<ILike>("like" , likeSchema)