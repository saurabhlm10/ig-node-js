import { v2 as cloudinary } from "cloudinary/";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer, { FileFilterCallback } from "multer";

interface Params {
  folder: string;
  resource_type: string;
  allowed_formats: string[];
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const params: Params | undefined = {
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
  fileFilter: function (req, file, cb: FileFilterCallback) {
    if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|mp4|mov)$/)) {
      return cb(new Error("Only images, pdfs and videos are allowed."));
    }
    cb(null, true);
  },
});

export default upload;