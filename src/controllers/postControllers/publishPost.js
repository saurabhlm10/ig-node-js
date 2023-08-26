const csv = require("csvtojson");
const { Parser } = require("json2csv");
const path = require("path");
const fs = require("fs");
const { publishMedia } = require("../../helpers/publishMedia");
const { AxiosError } = require("axios");
const { csvFields } = require("../../constants/CSVFields");

exports.publishPost = async (req, res) => {
  try {
    console.log("1");

    const csvFilePath = path.join(process.cwd(), "/src/files", "Example.csv");

    const posts = await csv().fromFile(csvFilePath);

    // Find Post with uploaded = none
    const currentPostId = posts.findIndex((post) => {
      return post.published === "";
    });

    console.log(currentPostId);

    console.log("currentPostId", currentPostId);

    console.log("2");

    if (currentPostId === -1) {
      return new Response("No Posts To Be Uploaded", { status: 404 });
    }

    const creation_id = posts[currentPostId].creation_id;

    console.log(creation_id);

    // Publish Media, save published_id, update published status to Y in CSV
    const published_id = (await publishMedia(
      creation_id,
      currentPostId
    ));

    console.log("4");

    posts[currentPostId].published = "Y";
    posts[currentPostId].published_id = published_id;

    const postsInCsv2 = new Parser({
      fields: csvFields,
    }).parse(posts);
    fs.writeFileSync(csvFilePath, postsInCsv2);

    console.log("5");

    return res.status(200).json({
      message: "Post Published Successfully",
      published_id,
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
