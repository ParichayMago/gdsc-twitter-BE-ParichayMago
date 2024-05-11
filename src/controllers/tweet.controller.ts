import { Response, Request } from "express";
import { tweet} from "../models/data/Tweet";
import mongoose from "mongoose";
import { HttpStatusCode, TweetBody, TweetRequestModel } from "../types/types";
import { withUser, withAuth} from "../types/withAuth";
import { User } from "../models/data/User";


// Create a tweet
export const insertTweet = async (
  req: Request<{}, {}, withUser<TweetRequestModel>>,
  res: Response
) => {
  try {
    const data = req.body;
    const userId = data.user._id
    const newTweet = await tweet.create({content: data.content, userId: userId});
  
    res.status(201).json({ msg: "Tweet created successfully", tweet: newTweet });
  } catch (error) {
    console.error("Error creating tweet:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Read all tweets
export const fetchAll = async (
  req: Request<{}, {}, {}>,
  res: Response
) => {
  try {
    const tweets = await tweet.find({});
    
    // Extract userIds from tweets
    const userIds = tweets.map(tweet => tweet.userId);

    
    const userCreds = await User.find({ _id: {$in : userIds} });
    
    // Creating a hashmap with userIds to store user creds,
    // Mapped the user with String user._id as by default it would be paired with object
    const userCredsMap = new Map(userCreds.map((user) => [String(user._id), user]));

    // Creating a map with tweet and there tweet authers creds 
    // getting userCredentials by passing in the String form of userId which we got from tweet.userId
    const userTweetsWithCreds = tweets.map((tweet) => ({
      ...tweet.toObject(),
      userCredentials: userCredsMap.get(`${tweet.userId}`)
    }));

    res.json({ tweets: userTweetsWithCreds });
  } catch (error) {
    console.error("Error fetching tweets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Featching all the tweets of a specific user
export const allTweetsOfTheUser = async(
  req: Request<{}, {}, withAuth<TweetRequestModel>>,
  res: Response
) => {
  try{
    const userId = req.body.userId;

    const tweets = await tweet.find({userId})

    return res.status(HttpStatusCode.Accepted).json({tweets, "success": true})
  } catch {
    return res.status(HttpStatusCode.BadRequest).json({"success": false})
  }
}

// Read a single tweet by ID
export const fetchById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid tweet ID" });
    }

    const foundTweet = await tweet.findById(id);

    if (!foundTweet) {
      return res.status(404).json({ error: "Tweet not found" });
    }

    res.json({ tweet: foundTweet });
  } catch (error) {
    console.error("Error fetching tweet by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Updataion of the tweeet
export const update = async (
  req: Request<{ id: string }, {}, Partial<TweetBody>>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const update = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid tweet ID" });
    }

    const updatedTweet = await tweet.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!updatedTweet) {
      return res.status(404).json({ error: "Tweet not found" });
    }

    res.json({ msg: "Tweet updated successfully", tweet: updatedTweet });
  } catch (error) {
    console.error("Error updating tweet:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Deletion of the tweet
export const deleteTweet = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid tweet ID" });
    }

    const deletedTweet = await tweet.findByIdAndDelete(id);

    if (!deletedTweet) {
      return res.status(404).json({ error: "Tweet not found" });
    }

    res.json({ msg: "Tweet deleted successfully" });
  } catch (error) {
    console.error("Error deleting tweet:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
