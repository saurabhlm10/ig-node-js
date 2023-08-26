const path = require("path");
const csv = require("csvtojson");
const axios = require("axios");
const { AxiosError } = require("axios");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const { csvFields } = require("../../../constants/CSVFields");
const { Parser } = require("json2csv");



const responseObject = {
  success: false,
  message: "",
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function videoResponseGetter(video_url, next) {
  await axios.get(video_url);

  return next();
}

exports.videoValidator = async (
  req,
  res,
  next
) => {
  // Read CSV
  let posts = [];
  let currentPostId = -1;
  let csvFilePath = "";
  try {
    csvFilePath = path.join(process.cwd(), "/src/files", "Example.csv");

    console.log("1");
    posts = await csv().fromFile(csvFilePath);

    // Find index with media_url == ""
    currentPostId = posts.findIndex((post) => {
      return post.media_url === "";
    });

    console.log("2");

    if (currentPostId === -1) {
      return next();
    }

    console.log("3");

    const video_url = posts[currentPostId].video_url;

    await axios.get(video_url);

    console.log("4");

    // await videoResponseGetter(video_url, next);

    return next();
  } catch (error) {
    if (error instanceof AxiosError) {
      // Mark current post as invalid
      posts[currentPostId].media_url = "Invalid";
      const postsInCsv = new Parser({
        fields: csvFields,
      }).parse(posts);
      fs.writeFileSync(csvFilePath, postsInCsv);
      return res.status(403).json({
        message: error.response?.data,
      });
    }
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(403).json({
        message: error.message,
      });
    }
  }
};
