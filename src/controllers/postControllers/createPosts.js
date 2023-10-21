const { months } = require("../../constants/months");
const Post = require("../../model/Post");
const TempPost = require("../../model/TempPost");

exports.createPosts = async (req, res) => {
  try {
    const page = "frenchiesforthewin";

    if (!page) {
      return res.status(400).send("Page name is required");
    }

    // Get Current Month
    const currentDate = new Date();
    const currentMonth = months[currentDate.getMonth()];

    // Get all TempPosts for one page for current month with status "not-processed"
    const tempPosts = await TempPost.find({
      status: "not-processed",
      publishMonth: currentMonth,
      page: page,
    });

    if (tempPosts.length === 0) {
      return res.status(400).send("No posts to process");
    }

    // Prepare array for insertMany
    const postsToInsert = tempPosts.map((tempPost) => ({
      source_reel_url: tempPost.source_reel_url,
      video_url: tempPost.video_url,
      media_url: tempPost.media_url,
      status: "uploaded-to-cloud",
      page: tempPost.page,
      publishMonth: tempPost.publishMonth,
      caption: tempPost.caption,
      mediaType: tempPost.mediaType,
    }));

    try {
      const newPosts = await Post.insertMany(postsToInsert);
      console.log(newPosts);

      // Update all tempPosts status to "processed"
      for (let tempPost of tempPosts) {
        tempPost.status = "processed";
        await tempPost.save();
      }
    } catch (error) {
      console.log(error.message);
    }

    return res.status(200).send("All posts processed");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json(error.message);
    }
  }
};
