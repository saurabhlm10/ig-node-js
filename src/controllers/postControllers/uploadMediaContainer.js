const path = require("path");
const csv = require("csvtojson");
const { uploadMedia } = require("../../helpers/uploadMedia");
const { Parser } = require("json2csv");
const { csvFields } = require("../../constants/CSVFields");
const fs = require("fs");
const { AxiosError } = require("axios");
const Post = require("../../model/Post");


exports.uploadMediaContainer = async (req, res) => {
  try {
    console.log("uploadMediaContainer");

    const currentPost = await Post.findOne({
      status: 'uploaded-to-cloud'
    })


    if (currentPost == {}) {
      return res.status(400).json({
        message: "No Posts To Be Uploaded",
      });
    }

    const mediaToUpload = currentPost.media_url;

    // Upload Media, save creation_id and uploaded status to CSV
    const creation_id = (await uploadMedia(
      mediaToUpload,
      currentPost.caption,
      res
    ));

    if (!creation_id) {
      return res.status(400).json({
        message: "Failed to upload media",
      });
    }

    console.log(creation_id)

    currentPost.creation_id = creation_id;



    currentPost.status = 'uploaded-media-container';

    const updatedPost = await Post.findByIdAndUpdate(currentPost._id, currentPost);

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
