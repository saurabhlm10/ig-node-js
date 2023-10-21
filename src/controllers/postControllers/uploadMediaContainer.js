const { uploadMedia } = require("../../helpers/uploadMedia");
const { AxiosError } = require("axios");
const Post = require("../../model/Post");
const { months } = require("../../constants/months");

exports.uploadMediaContainer = async (req, res) => {
  try {
    console.log("uploadMediaContainer");

    // Get Current Month
    const currentDate = new Date();
    const currentMonth = months[currentDate.getMonth()];

    // Find one post to upload from current month
    const currentPost = await Post.findOne({
      status: "uploaded-to-cloud",
      publishMonth: currentMonth,
    });

    console.log(currentPost._id);

    if (!currentPost) {
      return res.status(400).json({
        message: "No Posts To Be Uploaded",
      });
    }

    const mediaToUpload = currentPost.media_url;

    // Upload Media, save creation_id and uploaded status to CSV
    const creation_id = await uploadMedia(
      mediaToUpload,
      currentPost.caption,
      res
    );

    if (!creation_id) {
      return res.status(400).json({
        message: "Failed to upload media",
      });
    }

    currentPost.creation_id = creation_id;

    currentPost.status = "uploaded-media-container";

    await currentPost.save();

    return res.status(200).json({
      message: "Media Uploaded successfully",
      creation_id,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return res.status(400).json(error.response?.data);
    }
    if (error instanceof Error) {
      return res.status(400).json(error.message);
    }
  }
};
