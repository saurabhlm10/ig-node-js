import mongoose from "mongoose";
import { months } from "../constants/months";

const postSchema = new mongoose.Schema(
  {
    source_reel_url: {
      type: String,
      required: true,
      unique: true,
    },
    video_url: {
      type: String,
      required: true,
    },
    page: {
      type: String,
      required: true,
    },
    publishMonth: {
      type: String,
      required: true,
      enum: months,
    },
    caption: {
      type: String,
      required: true,
    },
    media_url: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        "uploaded-to-cloud",
        "uploaded-media-container",
        "published",
        "error",
      ],
      default: "uploaded-to-cloud",
    },
    creation_id: {
      type: String,
    },
    published_id: {
      type: String,
    },
    uploadDate: {
      type: String,
    },
    scheduledDate: {
      month: {
        type: String,
      },
      day: {
        type: String,
      },
      time: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;