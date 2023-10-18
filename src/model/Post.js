const mongoose = require("mongoose");
const { months } = require("../constants/months");

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

    pageName: {
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
    },

    mediatype: {
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
      matchMediaonth: {
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

module.exports = Post;
