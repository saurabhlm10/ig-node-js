import { Request, Response } from "express";
import Post from "../../model/Post";
import TempPost from "../../model/TempPost";
import { ENV } from "../../constants";

export const createPosts = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;

    if (!page) {
      return res.status(400).send("Page name is required");
    }

    // Get Current Month
    const currentDate = new Date();
    const currentMonth = ENV.months[currentDate.getMonth()];

    console.log("currentMonth", currentMonth);

    // Get all TempPosts for one page for current month with status "not-processed"
    const tempPosts = await TempPost.find({
      status: "not-processed",
      publishMonth: currentMonth,
      page: page,
    });

    console.log(tempPosts[0]);

    if (tempPosts.length === 0) {
      return res.status(400).send("No posts to process");
    }

    for (let tempPost of tempPosts) {
      try {
        // Create a new post for each tempPost
        const newPost = new Post({
          source_reel_url: tempPost.source_reel_url,
          video_url: tempPost.video_url,
          cover_url: tempPost.cover_url,
          media_url: tempPost.media_url,
          ownerUsername: tempPost.ownerUsername,
          status: "uploaded-to-cloud",
          page: tempPost.page,
          publishMonth: tempPost.publishMonth,
          caption: tempPost.caption,
          mediaType: tempPost.mediaType,
        });

        // Save the new post to the database
        await newPost.save();
        console.log("New Post Created: ", newPost);

        // Update tempPost status to "processed"
        tempPost.status = "processed";
        await tempPost.save();
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("An unexpected error occurred", error);
        }
      }
    }

    return res.status(200).send("All posts processed");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json(error.message);
    }
  }
};
