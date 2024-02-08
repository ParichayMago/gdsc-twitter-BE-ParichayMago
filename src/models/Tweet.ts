import mongoose, {  ObjectId, Schema , model } from "mongoose";

interface ITweet {
  userId : ObjectId
  content : string
  numberOfLikes : number
  numberOfRetweets : number
  comments : string[]
  createdAt : Date
}

const tweetSchema = new Schema<ITweet>({
  userId : {type : mongoose.Schema.ObjectId , required:true},
  content : {type : String , maxlength : 280},
  numberOfLikes : {type : Number ,default : 0},
  numberOfRetweets : {type : Number , default : 0},
  comments : [{type : String }],
  createdAt : {type: Date , default : Date.now}
})

export const tweet = model<ITweet>("tweet" , tweetSchema)
