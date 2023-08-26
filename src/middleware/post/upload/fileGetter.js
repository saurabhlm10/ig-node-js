const path = require("path");
const csv = require("csvtojson");
const { AxiosError } = require("axios");
const fs = require("fs");
const cloudinary = require("cloudinary/v2");
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

function _wait(n) {
  return new Promise((resolve) => setTimeout(resolve, n));
}

exports.fileGetter = async (
  req,
  res,
  next
) => {
  console.log('fileGetter')

  // Read CSV
  const csvFilePath = path.join(process.cwd(), "/src/files", "Example.csv");
  const posts = await csv().fromFile(csvFilePath);

  // Find index with media_url == ""

  const currentPostId = posts.findIndex((post) => {
    return post.media_url === "";
  });

  if (currentPostId === -1) {
    return next();
  }

  const video_url = posts[currentPostId].video_url;

  try {
    // Upload video to cloudinary
    const cloudinaryUploadResponse = await cloudinary.uploader.upload(
      video_url,
      { resource_type: "video" }
    );

    let retryCount = 0;

    console.log("cloudinaryUploadResponse", cloudinaryUploadResponse);

    while (!cloudinaryUploadResponse) {
      retryCount++;
      if (retryCount > 30) {
        return res.status(400).json({
          message: "Video Upload Failed",
        });
      }
      await _wait(3000);
    }

    console.log("cloudinaryUploadResponse", cloudinaryUploadResponse);

    // Update To CSV
    posts[currentPostId].media_url = cloudinaryUploadResponse.secure_url;

    const postsInCsv = new Parser({
      fields: csvFields,
    }).parse(posts);
    fs.writeFileSync(csvFilePath, postsInCsv);

    return next();
  } catch (error) {
    if (error instanceof AxiosError) {
      return res.status(403).json({
        message: error.response?.data,
      });
    }
    if (error instanceof Error) {
      return res.status(403).json({
        message: error.message,
      });
    }
  }
};
