const mongoose = require("mongoose");

const IGPageSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    followersCount: {
      type: Number,
      required: true,
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

IGPageSchema.pre("save", function (next) {
  this.link = "https://www.instagram.com/" + this.username;
  next();
});

const IGPage = mongoose.model("IGPage", IGPageSchema);

module.exports = IGPage;
