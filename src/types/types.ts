import { ObjectId } from "mongoose"

export interface SignUpBody{
  name:string
  email : string
  age: number
  password : string
}


export interface TweetBody {
  userId : ObjectId
  content : string
  numberOfLikes : number
  numberOfRetweets : number
  comments : string[]
  createdAt : Date
  likes : ObjectId[]
}

export interface TweetRequestModel {
  content : string
}