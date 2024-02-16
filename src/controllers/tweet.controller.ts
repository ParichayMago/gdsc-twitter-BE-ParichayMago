import { Response, Request } from "express";
import { tweet} from "../models/data/Tweet";
import mongoose from "mongoose";
import { TweetBody, TweetRequestModel } from "../types/types";
import { withAuth } from "../types/withAuth";

// Create a tweet
export const insertTweet = async (
  req: Request<{}, {}, withAuth<TweetRequestModel>>,
  res: Response
) => {
  try {
    const data = req.body;

    const newTweet = tweet.create({
      userId : data.loggedInUserId,
      content : data.content,
    });



    res.status(201).json({ msg: "Tweet created successfully", tweet: newTweet });
  } catch (error) {
    console.error("Error creating tweet:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read all tweets
export const fetchAll = async (
  req: Request,
  res: Response
) => {
  try {
    const data = req.body
    const tweets = await tweet.find({userId : data.loggedInUserId});

    res.json({ tweets });
  } catch (error) {
    console.error("Error fetching tweets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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

// Updataion
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

// Deletion
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
