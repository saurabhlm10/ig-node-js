import csv from "csvtojson";
import { Parser } from "json2csv";
import path from "path";
import fs from "fs";
import { uploadMedia } from "../../helpers/uploadMedia";
import { publishMedia } from "../../helpers/publishMedia";
import { Request, Response } from "express";
import { AxiosError } from "axios";
import { csvFields } from "../../constants/CSVFields";

export const uploadAndPublishPost = async (req: Request, res: Response) => {
  try {
    const csvFilePath = path.join(process.cwd(), "/src/files", "Example.csv");

    const posts: PostFromCSV[] = await csv().fromFile(csvFilePath);

    // Find Post with uploaded = none
    const currentPostId: number = posts.findIndex((post) => {
      return post.uploaded === "";
    });

    if (currentPostId === -1) {
      return new Response("No Posts To Be Uploaded", { status: 404 });
    }

    const mediaToUpload = posts[currentPostId].media_url;

    // Upload Media, save creation_id and uploaded status to CSV
    const creation_id = (await uploadMedia(
      mediaToUpload,
      posts[currentPostId].caption
    )) as string;

    posts[currentPostId].creation_id = creation_id;
    posts[currentPostId].uploaded = "Y";

    const postsInCsv = new Parser({
      fields: csvFields,
    }).parse(posts);
    fs.writeFileSync(csvFilePath, postsInCsv);

    // Publish Media, save published_id, update published status to Y in CSV
    const published_id = (await publishMedia(creation_id)) as string;

    posts[currentPostId].published = "Y";
    posts[currentPostId].published_id = published_id;

    const postsInCsv2 = new Parser({
      fields: csvFields,
    }).parse(posts);
    fs.writeFileSync(csvFilePath, postsInCsv2);

    return res.status(200).json({
      message: "Post Published Successfully",
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
