import mongoose, {  ObjectId, Schema , model} from "mongoose";

export interface ITweet {
  userId : ObjectId,
  replyedId: ObjectId,
  content : string
  numberOfLikes : number
  numberOfRetweets : number
  comments : string[]
  createdAt : Date
  likes : ObjectId[]
}

const tweetSchema = new Schema<ITweet>({
  userId : {type : mongoose.Schema.Types.ObjectId , required:true},
  replyedId: {type: mongoose.Schema.Types.ObjectId, required:false, default: null},
  content : {type : String , maxlength : 280},
  numberOfLikes : {type : Number ,default : 0},
  numberOfRetweets : {type : Number , default : 0},
  comments : [{type : String, default: 0}],
  createdAt : {type: Date , default : Date.now},
  likes : [{type : mongoose.Schema.Types.ObjectId, default: 0}]
})

export const tweet = model<ITweet>("tweet" , tweetSchema)
