import mongoose from "mongoose";
import { months } from "../constants/months.js";

const monthStatusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: months,
      unique: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["not-updated", "success", "fail"],
      default: "not-updated",
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
