const path = require("path");
const csv = require("csvtojson");
const { uploadMedia } = require("../../helpers/uploadMedia");
const { Parser } = require("json2csv");
const { csvFields } = require("../../constants/CSVFields");
const fs = require("fs");
const { AxiosError } = require("axios");


exports.uploadMediaContainer = async (req, res) => {
  try {
    console.log("uploadMediaContainer");
    const csvFilePath = path.join(process.cwd(), "/src/files", "Example.csv");

    const posts = await csv().fromFile(csvFilePath);

    // Find Post with uploaded = none
    const currentPostId = posts.findIndex((post) => {
      return post.uploaded === "";
    });
    if (currentPostId === -1) {
      return res.status(400).json({
        message: "No Posts To Be Uploaded",
      });
    }

    const mediaToUpload = posts[currentPostId].media_url;

    // Upload Media, save creation_id and uploaded status to CSV
    const creation_id = (await uploadMedia(
      mediaToUpload,
      posts[currentPostId].caption,
      res
    ));

    posts[currentPostId].creation_id = creation_id;
    posts[currentPostId].uploaded = "Y";

    const postsInCsv = new Parser({
      fields: csvFields,
    }).parse(posts);
    fs.writeFileSync(csvFilePath, postsInCsv);

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
