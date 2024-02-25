import mongoose from "mongoose";
import { ENV } from "../constants";

export enum MonthStatusStatusValues {
  NOT_UPDATED = "not-updated",
  SUCCESS = "success",
  FAIL = "fail",
  IN_PROGRESS = "in-progress",
}

const monthStatusSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      enum: ENV.months,
      unique: true,
    },
    year: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: MonthStatusStatusValues,
      default: MonthStatusStatusValues.NOT_UPDATED,
    },
    statusMessage: {
      type: String,
      required: true,
      default: "Not Updated Yet",
    },
  },
  {
    timestamps: true,
  }
);

const MonthStatus = mongoose.model("MonthStatus", monthStatusSchema);

export default MonthStatus;
