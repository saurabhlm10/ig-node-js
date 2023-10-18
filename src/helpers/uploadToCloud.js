const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadToCloud = async (video_url) => {
  try {
    const cloudinaryUploadResponse = await cloudinary.uploader.upload(
      video_url,
      { resource_type: "video" }
    );

    console.log(
      "cloudinaryUploadResponse.secure_url",
      cloudinaryUploadResponse.secure_url
    );

    return cloudinaryUploadResponse.secure_url;
  } catch (error) {
    throw new Error(error.message);
  }
};
