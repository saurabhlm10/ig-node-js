const TempPost = require("../../model/TempPost");

exports.deleteTempPosts = async (req, res) => {
  try {
    const { page } = req.body;

    if (!page) {
      return res.status(400).send("Page name is required");
    }

    await TempPost.deleteMany({
      status: "processed",
      page,
    });

    res.status(200).send("Deleted Temp Posts for " + page);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
