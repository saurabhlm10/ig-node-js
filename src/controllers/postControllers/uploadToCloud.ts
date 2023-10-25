import path from "path";
import csv from "csvtojson";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { csvFields } from "../../constants/CSVFields";
import { Parser } from "json2csv";
import { Request, Response } from "express";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const _wait = (n: number) => new Promise((resolve) => setTimeout(resolve, n));

export const uploadToCloud = async (req: Request, res: Response) => {
  console.log("uploadToCloud");
  try {
    const csvFilePath = path.join(process.cwd(), "/src/files", "Example.csv");
    console.log("csvFilePath", csvFilePath);
    const posts = await csv().fromFile(csvFilePath);

    console.log("1");

    const currentPostId = posts.findIndex((post) => post.media_url === "");
    console.log("2");

    if (currentPostId === -1) {
      return res.status(400).json({ message: "No Posts To Be Uploaded" });
    }

    console.log("3");
    const video_url = posts[currentPostId].video_url;
    const cloudinaryUploadResponse = await cloudinary.uploader.upload(video_url, { resource_type: "video" });
    console.log("3");

    console.log("cloudinaryUploadResponse", cloudinaryUploadResponse.secure_url);

    posts[currentPostId].media_url = cloudinaryUploadResponse.secure_url;
    console.log("4");

    const postsInCsv = new Parser({ fields: csvFields }).parse(posts);
    fs.writeFileSync(csvFilePath, postsInCsv);
    console.log("5");

    return res.status(200).json({
      message: "Video Upload Successful",
      media_url: posts[currentPostId].media_url,
    });
  } catch (error) {
    console.log("error");
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(400).json({ message: "Video Upload Failed", error });
  }
};
