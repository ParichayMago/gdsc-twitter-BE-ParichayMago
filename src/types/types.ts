import { strict } from "assert"
import { ObjectId } from "mongoose"

// Http Status code
export enum HttpStatusCode {
  OK = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  InternalServerError = 500,
}


export interface SignUpBody{
  name:string,
  username: string
  email : string,
  college: string,
  bio?: string,
  password : string,
  pfp?: string
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

export interface UserUpdateModel {
  name: String,
  email:String,
  password: String,
  dob: Date,
  bio:String
}

export interface loginBody{
  email : string ,
  password : string | Buffer
}