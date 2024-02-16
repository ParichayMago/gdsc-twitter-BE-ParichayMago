import  {Schema , model } from "mongoose";

interface ITweetRequest {
  content : string
}

const tweetSchema = new Schema<ITweetRequest>({
  content : {type : String , maxlength : 280},
})

export const tweetRequest = model<ITweetRequest>("tweet" , tweetSchema)