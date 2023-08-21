const path = require("path");
const fs = require("fs");
const csv = require("csvtojson");
const promptSync = require("prompt-sync");
const { Parser } = require("json2csv");

const csvFields = [
  "source_reel_url",
  "video_url",
  "media_url",
  "caption",
  "uploaded",
  "creation_id",
  "published",
  "published_id",
];


const prompt = promptSync();
async function completeReset(postId = 0) {
  const csvFilePath = path.join(process.cwd(), "/../../files", "Example.csv");
  console.log(csvFilePath)

  const posts = await csv().fromFile(csvFilePath);

  posts[postId].media_url = "";
  posts[postId].creation_id = "";
  posts[postId].published = "";
  posts[postId].published_id = "";
  posts[postId].uploaded = "";

  const postsInCsv = new Parser({
    fields: csvFields,
  }).parse(posts);
  fs.writeFileSync(csvFilePath, postsInCsv);
}

async function completeResetAll() {
  const csvFilePath = path.join(process.cwd(), "/../../files", "Example.csv");

  const posts = await csv().fromFile(csvFilePath);

  posts.forEach((post) => {
    console.log(post)
    post.media_url = "";
    post.creation_id = "";
    post.published = "";
    post.published_id = "";
    post.uploaded = "";
  })


  const postsInCsv = new Parser({
    fields: csvFields,
  }).parse(posts);
  fs.writeFileSync(csvFilePath, postsInCsv);
}



// const postId = Number(prompt("Enter postId to reset: "));
const postId = 0
// completeReset(postId);

if (postId === -1) {
  completeResetAll();
} else {
  completeReset(postId);
}