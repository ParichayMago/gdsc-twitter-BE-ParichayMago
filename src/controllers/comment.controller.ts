import { withUser } from "../types/withAuth"
import { HttpStatusCode, TweetRequestModel } from "../types/types";
import { validateTweetId } from "../middleware/validation/validator";
import { RequestHandler } from 'express';
import { tweet } from "../models/data/Tweet";


// CREATES THE COMMENTS REPLYING TO ID GIVEN IN THE PARAMS....
export const createComment: RequestHandler<{ id: string }, {}, withUser<TweetRequestModel>> = async (
  req,
  res
) => {
  try {

// repliedId => the tweet replying to.... 
  const repliedId =  req.params.id;

  const data = req.body
  const userId = data.user._id;

  // validating id tweeting to... 
  const validated = await validateTweetId(repliedId);
  if(!validated) {
    return res.status(HttpStatusCode.BadRequest).json("msg: Couldnt find the tweet")
  }

// creating new Id
  const newComment = await tweet.create({content: data.content, replyedId: repliedId, userId: userId })
  
  res.status(HttpStatusCode.Accepted).json({msg: "comment posted", comment: newComment, To: repliedId})
  
  } catch (e) {
    res.status(HttpStatusCode.BadRequest).json({error: "Internal Server Error while creating a comment: ", e})
  }
}


// GETS COMMENT OF THE GIVEN COMMENTS IN THE PARAMS.....
export const getComment: RequestHandler<{id: String}, {}, {}> = async (
  req,
  res
) => {
  try {
    // getting the id of the tweet to fetch all the comments for. 
    // It can be either a tweet or a comment soo reffering only by the tweet

    const tweetId = req.params.id

    const validate = await validateTweetId(tweetId)

    if(!validate) {
      res.status(400).json({msg: "couldnt find the tweet"})
    }

    const findComments = await tweet.find({replyedId: tweetId}) 

    res.status(200).json({comments: findComments})
    
  } catch (error) {
    res.status(500).json({error: error})
  }
}
