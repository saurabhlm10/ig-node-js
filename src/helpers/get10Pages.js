const CollectionIGPage = require("../model/CollectionIGPage");
const { limit } = require("../constants/dbquery");

const get10Pages = async (offset) => {
  try {
    // Get 10 DB entries sorted in descending order
    const collectionPages = await CollectionIGPage.aggregate([
      {
        $sort: { followersCount: -1 }, // Sort by followersCount in descending order
      },
      { $skip: offset },
      {
        $limit: limit, // Limit to 10 results
      },
    ]);

    return collectionPages;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { get10Pages };
