const { months } = require("../constants/months");
const TempPost = require("../model/TempPost");
const { uploadToCloud } = require("./uploadToCloud");

async function uploadReelToDB(reel, page) {
  const currentDate = new Date();
  const currentMonthName = months[currentDate.getMonth()];

  try {
    // Upload video to cloudinary
    const media_url = await uploadToCloud(reel.videoUrl);

    // Add Post to Mongo
    const post = {
      source_reel_url: reel.url,
      video_url: reel.videoUrl,
      media_url: media_url,
      page: page,
      publishMonth: currentMonthName,
      caption: reel.caption,
    };

    await TempPost.create(post);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { uploadReelToDB };