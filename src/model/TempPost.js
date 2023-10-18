const mongoose = require("mongoose");
const { months } = require("../constants/months");

const tempPostSchema = new mongoose.Schema(
  {
    source_reel_url: {
      type: String,
      required: true,
      unique: true,
    },
    video_url: {
      type: String,
      required: true,
      unique: true,
    },
    media_url: {
      type: String,
      required: true,
      unique: true,
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
  },
  {
    timestamps: true,
  }
);

const TempPost = mongoose.model("TempPost", tempPostSchema);

module.exports = TempPost;
