import csv from "csvtojson";
import { Parser } from "json2csv";
import path from "path";
import fs from "fs";
import { uploadMedia } from "../../helpers/uploadMedia";
import { publishMedia } from "../../helpers/publishMedia";
import { Request, Response, response } from "express";
export const uploadAndPublishPost = async (req: Request, res: Response) => {
  try {
    console.log("reached uploadAndPublishPost");

    const csvFilePath = path.join(process.cwd(), "/src/files", "Example.csv");

    console.log(csvFilePath);

    console.log("1", csvFilePath);

    const posts = await csv().fromFile(csvFilePath);

    // console.log("2", posts);

    // Find Post with uploaded = none
    const currentPostId: number = posts.findIndex((post) => {
      return post.uploaded === "";
    });

    console.log("3", currentPostId);

    if (currentPostId === -1) {
      return new Response("No Posts To Be Uploaded", { status: 404 });
    }

    const mediaToUpload = posts[currentPostId].image_url;

    console.log("4", mediaToUpload);

    const creation_id = (await uploadMedia(
      mediaToUpload,
      posts[currentPostId].caption
    )) as string;

    console.log("5", mediaToUpload);

    posts[currentPostId].creation_id = creation_id;
    posts[currentPostId].uploaded = "Y";

    // console.log("6", posts);

    const postsInCsv = new Parser({
      fields: [
        "image_url",
        "caption",
        "uploaded",
        "creation_id",
        "published",
        "published_id",
      ],
    }).parse(posts);
    fs.writeFileSync(csvFilePath, postsInCsv);

    // console.log("7", postsInCsv);

    const published_id = (await publishMedia(creation_id)) as string;

    posts[currentPostId].published = "Y";
    posts[currentPostId].published_id = published_id;

    const postsInCsv2 = new Parser({
      fields: ["image_url", "caption", "uploaded", "creation_id", "published", "published_id"],
    }).parse(posts);
    fs.writeFileSync(csvFilePath, postsInCsv2);

    // console.log(postsInCsv2);

    return res.status(200).json({
      message: "Post Published Successfully",
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }

    return new Response("Internal Server Error", { status: 500 });
  }
};
