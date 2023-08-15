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

export const fileGetter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Read CSV
  const csvFilePath = path.join(process.cwd(), "/src/files", "Example.csv");
  const posts: PostFromCSV[] = await csv().fromFile(csvFilePath);

  // Find index with media_url == ""

  const currentPostId: number = posts.findIndex((post) => {
    return post.media_url === "";
  });

  if (currentPostId === -1) {
    return next();
  }

  // Make API call to get video_url
  const source_reel_url: string = posts[currentPostId].source_reel_url;
  const jsonModifier: string = "?__a=1&__d=dis";
  const videoJsonUrl: string = source_reel_url + jsonModifier;
  try {
    const videoJson = await axios.get(videoJsonUrl);

    const video_url: string = videoJson.data.graphql.shortcode_media.video_url;

    // Upload video to cloudinary
    const cloudinaryUploadResponse = await cloudinary.uploader.upload(
      video_url,
      { resource_type: "video" }
    );

    // Update To CSV
    posts[currentPostId].media_url = cloudinaryUploadResponse.secure_url;

    const postsInCsv = new Parser({
      fields: csvFields,
    }).parse(posts);
    fs.writeFileSync(csvFilePath, postsInCsv);

    return next();
  } catch (error) {
    if (error instanceof AxiosError) {
      return res.status(403).json({
        message: error.response?.data,
      });
    }
    if (error instanceof Error) {
      console.log(error);
       return res.status(403).json({
        message: error.message,
      });
    }
  }
};
