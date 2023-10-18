const { fetchRedis } = require("../../helpers/fetchRedis");
const CollectionIGPage = require("../../model/CollectionIGPage");
const { months } = require("../../constants/months");
const { getReelsFromApify } = require("../../helpers/getReelsFromApify");
const { postsPerMonth } = require("../../constants/postsPerDay");
const { AxiosError } = require("axios");
const TempPost = require("../../model/TempPost");
const { getFilteredReels } = require("../../helpers/getFilteredReels");
const { uploadToCloud } = require("../../helpers/uploadToCloud");
const { uploadReelToDB } = require("../../helpers/uploadReelToDB");

const get10Pages = async () => {
  try {
    // Get 10 DB entries sorted in descending order
    const collectionPages = await CollectionIGPage.aggregate([
      {
        $sort: { followersCount: -1 }, // Sort by followersCount in descending order
      },
      {
        $limit: 10, // Limit to 10 results
      },
    ]);

    return collectionPages;
  } catch (error) {}
};

exports.collectPosts = async (req, res) => {
  try {
    const page = "frenchiesforthewin";

    // Object for maintaining state in Redis
    let redisEntry = {
      offset: 0,
    };

    console.log("Getting Month-Year");
    // Get current Month Name
    const currentDate = new Date();

    const currentMonth = currentDate.getMonth();
    const currentMonthYearName = `${
      months[currentDate.getMonth()]
    }-${currentDate.getFullYear()}`;

    const redisKey = page + "-" + currentMonthYearName;

    // Get Current State from Redis
    const rawResponse = await fetchRedis("get", currentMonthYearName + "hello");

    if (!rawResponse) {
      // Create entry in Redis
      console.log("Creating Entry In Redis");
      await fetchRedis("set", redisKey, JSON.stringify(redisEntry));
    } else {
      console.log("Got Entry From Redis");
      redisEntry.offset = rawResponse.offset;
    }

    while (redisEntry.offset < postsPerMonth) {
      // Get 10 DB entries sorted in descending order
      const collectionPages = await get10Pages();

      const usernames = collectionPages.map((page) => {
        return page.username;
      });

      // Get Reels from Apify
      const reels = await getReelsFromApify(usernames);

      // Filter out the reels by the criteria
      const filteredReels = await getFilteredReels(reels, usernames);

      filteredReels.forEach(async (reel) => await uploadReelToDB(reel, page));

      redisEntry.offset = redisEntry.offset + filteredReels.length;

      await fetchRedis("set", redisKey, JSON.stringify(redisEntry));
    }

    return res.status(200).send(redisEntry);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response.data);
      return res.status(500).send(error.response.data);
    }
    console.log(error.message);
    res.status(500).send(error.message);
  }
};
