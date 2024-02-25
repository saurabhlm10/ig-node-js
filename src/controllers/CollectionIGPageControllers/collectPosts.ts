import { fetchRedis } from "../../helpers/fetchRedis";
import { getReelsFromApify } from "../../helpers/getReelsFromApify";
import { getFilteredReels } from "../../helpers/getFilteredReels";
import { uploadReelToDB } from "../../helpers/uploadReelToDB";
import { get10Pages } from "../../helpers/get10Pages";
import { Request, Response } from "express";
import { getCurrentMonthYearName } from "../../helpers/getCurrentMonthYearName";
import { RedisEntry, StatusValues } from "../../types/RedisEntry.type";
import { ENV } from "../../constants";

export const collectPosts = async (req: Request, res: Response) => {
  const { page, mediaType } = req.params;

  if (!(page || mediaType))
    return res.status(400).json({ message: "page and mediaType in required" });

  console.log("Getting Month-Year");

  // Get current Month Name
  const currentMonthYearName = getCurrentMonthYearName();

  const redisKey = page + "-" + currentMonthYearName + "-" + mediaType;

  // Object for maintaining state in Redis
  let redisEntry: RedisEntry = {
    postOffset: 0,
    pageOffset: 0,
    status: StatusValues.IN_PROGRESS,
    statusMessage: `Collecting posts for ` + redisKey,
  };

  console.log("Checking If Current State In Redis");
  try {
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

    res.status(200).send(`Collecting posts for ${redisKey}`);

    console.log("Number Of Posts To Collect", ENV.postsPerMonth);

    while (redisEntry.postOffset < ENV.postsPerMonth) {
      // Get 10 DB entries sorted in descending order
      const collectionPages = await get10Pages(page, redisEntry.pageOffset);

      const usernames = collectionPages!.map((page) => {
        return page.username;
      });

      // Get Reels from Apify
      const reels = await getReelsFromApify(usernames);

      // Filter out the reels by the criteria
      const filteredReels = await getFilteredReels(reels, usernames);

      filteredReels.forEach(
        async (reel: InstagramPost) => await uploadReelToDB(reel, page)
      );

      redisEntry.postOffset = redisEntry.postOffset + filteredReels.length;
      redisEntry.pageOffset = redisEntry.pageOffset + Number(ENV.limit);
      redisEntry.status = StatusValues.IN_PROGRESS;
      redisEntry.statusMessage = "Collecting Posts for " + redisKey;
      await fetchRedis("set", redisKey, JSON.stringify(redisEntry));
    }

    console.log("Collected Posts Successfully");

    redisEntry.status = StatusValues.SUCCESS;
    redisEntry.statusMessage = "Collected Posts Successfully for " + redisKey;
    await fetchRedis("set", redisKey, JSON.stringify(redisEntry));

    return;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      redisEntry.status = StatusValues.ERROR;
      redisEntry.statusMessage = error.message;
      await fetchRedis("set", redisKey, JSON.stringify(redisEntry));
    } else {
      console.log("An unexpected error occurred", error);
    }
  }
};
