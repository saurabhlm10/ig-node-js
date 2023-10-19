const { fetchRedis } = require("../../helpers/fetchRedis");
const { months } = require("../../constants/months");
const { getReelsFromApify } = require("../../helpers/getReelsFromApify");
const { postsPerMonth } = require("../../constants/postsPerDay");
const { getFilteredReels } = require("../../helpers/getFilteredReels");
const { uploadReelToDB } = require("../../helpers/uploadReelToDB");
const { get10Pages } = require("../../helpers/get10Pages");
const { limit } = require("../../constants/dbquery");

exports.collectPosts = async (req, res) => {
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
    const currentMonthYearName = `${
      months[currentDate.getMonth()]
    }-${currentDate.getFullYear()}`;

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

      const usernames = collectionPages.map((page) => {
        return page.username;
      });

      // Get Reels from Apify
      const reels = await getReelsFromApify(usernames);

      // Filter out the reels by the criteria
      const filteredReels = await getFilteredReels(reels, usernames);

      filteredReels.forEach(async (reel) => await uploadReelToDB(reel, page));

      redisEntry.postOffset = redisEntry.postOffset + filteredReels.length;
      redisEntry.pageOffset = redisEntry.pageOffset + limit;

      await fetchRedis("set", redisKey, JSON.stringify(redisEntry));
    }

    return res.status(200).send(redisEntry);
  } catch (error) {
    // if (error instanceof AxiosError) {
    //   console.log(error.response.data);
    //   return res.status(500).send(error.response.data);
    // }
    console.log(error.message);
    res.status(500).send(error.message);
  }
};
