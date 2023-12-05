import mongoose from 'mongoose';

const IGPageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const IGPageModel = mongoose.model('IGPage', IGPageSchema);

export default IGPageModel;
