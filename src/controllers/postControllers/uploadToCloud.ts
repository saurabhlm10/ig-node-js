import { NextFunction, Request, Response, json } from "express";
import path from "path";
import csv from "csvtojson";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary/";
import { csvFields } from "../../constants/CSVFields";
import { Parser } from "json2csv";
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function _wait(n: number) {
  return new Promise((resolve) => setTimeout(resolve, n));
}

export const uploadToCloud = async (req: Request, res: Response) => {
  console.log("uploadToCloud");
  try {
    // return res.send('OK')
    // Read CSV
    // return res.send('OK')

    const csvFilePath = path.join(process.cwd(), "/src/files", "Example.csv");
    console.log("csvFilePath", csvFilePath);
    const posts: PostFromCSV[] = await csv().fromFile(csvFilePath);

    console.log("1");

    // Find index with media_url == ""

    const currentPostId: number = posts.findIndex((post) => {
      return post.media_url === "";
    });

    console.log("2");

    if (currentPostId === -1) {
      return res.status(400).json({
        message: "No Posts To Be Uploaded",
      });
    }

    console.log("3");

    const video_url: string = posts[currentPostId].video_url;

    // Upload video to cloudinary
    // const cloudinaryUploadResponse = {
    //   secure_url: "hello.com",
    // };
    const cloudinaryUploadResponse = await cloudinary.uploader.upload(
      video_url,
      { resource_type: "video" }
    );

    console.log("3");

    let retryCount = 0;

    // console.log("cloudinaryUploadResponse", cloudinaryUploadResponse);

    // while (!cloudinaryUploadResponse) {
    //   console.log(retryCount);
    //   retryCount++;
    //   if (retryCount > 30) {
    //     return res.status(400).json({
    //       message: "Video Upload Failed",
    //     });
    //   }
    //   await _wait(3000);
    // }

    console.log(
      "cloudinaryUploadResponse",
      cloudinaryUploadResponse.secure_url
    );

    // Update To CSV
    posts[currentPostId].media_url = cloudinaryUploadResponse.secure_url;

    console.log("4");

    const postsInCsv = new Parser({
      fields: csvFields,
    }).parse(posts);
    fs.writeFileSync(csvFilePath, postsInCsv);

    console.log("5");

    return res.status(200).json({
      message: "Video Upload Successful",
      media_url: posts[currentPostId].media_url,
    });
  } catch (error) {
    console.log("error");
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    return res.status(400).json({
      message: "Video Upload Failed",
      error,
    });
  }
};
