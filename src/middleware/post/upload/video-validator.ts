import { NextFunction, Request, Response } from "express";
import path from "path";
import csv from "csvtojson";
import axios, { AxiosError } from "axios";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary/";
import { csvFields } from "../../../constants/CSVFields";
import { Parser } from "json2csv";

interface MiddlewareResponse {
  success: boolean;
  message: string;
}

const responseObject: MiddlewareResponse = {
  success: false,
  message: "",
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function videoResponseGetter(video_url: string, next: NextFunction) {
  await axios.get(video_url);

  return next();
}

export const videoValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Read CSV
  let posts: PostFromCSV[] = [];
  let currentPostId: number = -1;
  let csvFilePath: string = "";
  try {
    csvFilePath = path.join(process.cwd(), "/src/files", "Example.csv");

    console.log("1");
    posts = await csv().fromFile(csvFilePath);

    // Find index with media_url == ""
    currentPostId = posts.findIndex((post) => {
      return post.media_url === "";
    });

    console.log("2");

    if (currentPostId === -1) {
      return next();
    }

    console.log("3");

    const video_url: string = posts[currentPostId].video_url;

    await axios.get(video_url);

    console.log("4");

    // await videoResponseGetter(video_url, next);

    return next();
  } catch (error) {
    if (error instanceof AxiosError) {
      // Mark current post as invalid
      posts[currentPostId].media_url = "Invalid";
      const postsInCsv = new Parser({
        fields: csvFields,
      }).parse(posts);
      fs.writeFileSync(csvFilePath, postsInCsv);
      return res.status(403).json({
        message: error.response?.data,
      });
    }
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(403).json({
        message: error.message,
      });
    }
  }
};
