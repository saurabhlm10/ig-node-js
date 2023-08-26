const { v2: cloudinary } = require("cloudinary/");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const params = {
  folder: "CircleUp",
  resource_type: "auto",
  allowed_formats: ["jpg", "jpeg", "png", "mp4", "mov"],
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params,
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 20, // 20MB file size limit
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|mp4|mov)$/)) {
      return cb(new Error("Only images, pdfs and videos are allowed."));
    }
    cb(null, true);
  },
});

module.exports = upload;