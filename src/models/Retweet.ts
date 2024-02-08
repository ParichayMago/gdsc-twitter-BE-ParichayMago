import mongoose, { ObjectId, Schema, model } from "mongoose";

interface IRetweet{
    userid : ObjectId
    Tweet_Id : ObjectId
    RetweetAt : Date
}

const likeSchema = new Schema<IRetweet>({
    userid : {type : mongoose.Schema.Types.ObjectId , required:true},
    Tweet_Id : {type : mongoose.Schema.Types.ObjectId , required : true},
    RetweetAt : {type : Date , default : Date.now}
})

export const like = model<IRetweet>("like" , likeSchema)