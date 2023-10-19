const { months } = require("../../constants/months");
const Post = require("../../model/Post");
const TempPost = require("../../model/TempPost");

exports.createPosts = async (req, res) => {
  try {
    const page = "frenchiesforthewin";

    // Get Current Month
    const currentDate = new Date();
    const currentMonth = months[currentDate.getMonth()];

    // Get all TempPosts for one page for current month with status "not-processed"
    const tempPosts = await TempPost.find({
      status: "not-processed",
      publishMonth: currentMonth,
      page: page,
    });

    // Loop through each TempPost and create a new Post
    tempPosts.forEach(async (tempPost) => {
      const post = { ...tempPost };
      post.status = "uploaded-to-cloud";
      try {
        await Post.create(post);
      } catch (error) {
        console.log(error.mesage);
      }

      tempPost.save();
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json(error.message);
    }
  }
};
