import mongoose from 'mongoose';
import { months } from '../constants';

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
    mediaType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['not-processed', 'processed'],
      default: 'not-processed',
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

const TempPost = mongoose.model('TempPost', tempPostSchema);

export default TempPost;
