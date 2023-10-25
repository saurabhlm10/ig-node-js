import { fetchRedis } from "../../helpers/fetchRedis.js";
import { months } from "../../constants/months.js";
import { getReelsFromApify } from "../../helpers/getReelsFromApify.js";
import { postsPerMonth } from "../../constants/postsPerDay.js";
import { getFilteredReels } from "../../helpers/getFilteredReels.js";
import { uploadReelToDB } from "../../helpers/uploadReelToDB.js";
import { get10Pages } from "../../helpers/get10Pages.js";
import { limit } from "../../constants/dbquery.js";
import { Request, Response } from "express";

export const collectPosts = async (req: Request, res: Response) => {
  try {
    const page = "frenchiesforthewin";
    const mediaType = "reels";

    // Object for maintaining state in Redis
    let redisEntry = {
      postOffset: 0,
      pageOffset: 0,
    };

    console.log("Getting Month-Year");

    // Get current Month Name
    const currentDate = new Date();
    const currentMonthYearName = `${months[currentDate.getMonth()]}-${currentDate.getFullYear()}`;

    const redisKey = page + "-" + currentMonthYearName + "-" + mediaType;

    console.log("Checking If Current State In Redis");
    // Get Current State from Redis
    const rawResponse = await fetchRedis("get", redisKey);

    console.log("rawResponse", rawResponse);

    if (!rawResponse) {
      // Create entry in Redis
      console.log("Creating Entry In Redis");
      await fetchRedis("set", redisKey, JSON.stringify(redisEntry));
    } else {
      console.log("Got Entry From Redis");
      redisEntry.postOffset = rawResponse.postOffset;
      redisEntry.pageOffset = rawResponse.pageOffset;
    }

    while (redisEntry.postOffset < postsPerMonth) {
      // Get 10 DB entries sorted in descending order
      const collectionPages = await get10Pages(redisEntry.pageOffset);

      const usernames = collectionPages!.map((page) => {
        return page.username;
      });

      // Get Reels from Apify
      const reels = await getReelsFromApify(usernames);

      // Filter out the reels by the criteria
      const filteredReels = await getFilteredReels(reels);

      filteredReels.forEach(async (reel: InstagramPost) => await uploadReelToDB(reel, page));

      redisEntry.postOffset = redisEntry.postOffset + filteredReels.length;
      redisEntry.pageOffset = redisEntry.pageOffset + limit;

      await fetchRedis("set", redisKey, JSON.stringify(redisEntry));
    }

    return res.status(200).send(redisEntry);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).send(error.message);

    } else {
      console.log('An unexpected error occurred', error);
    }
  }
};
