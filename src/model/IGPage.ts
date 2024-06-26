import mongoose from "mongoose";

export enum PageStages {
  One = 1,
  Two = 2,
  Three = 3,
}

const IGPageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    stage: {
      type: String,
      required: true,
      enum: PageStages,
      default: PageStages.One,
    },
    caption: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const IGPageModel = mongoose.model("IGPage", IGPageSchema);

export default IGPageModel;
