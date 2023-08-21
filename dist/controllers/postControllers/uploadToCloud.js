"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloud = void 0;
const path_1 = __importDefault(require("path"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = require("cloudinary/");
const CSVFields_1 = require("../../constants/CSVFields");
const json2csv_1 = require("json2csv");
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
function _wait(n) {
    return new Promise((resolve) => setTimeout(resolve, n));
}
const uploadToCloud = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("uploadToCloud");
    try {
        // return res.send('OK')
        // Read CSV
        // return res.send('OK')
        const csvFilePath = path_1.default.join(process.cwd(), "/src/files", "Example.csv");
        console.log("csvFilePath", csvFilePath);
        const posts = yield (0, csvtojson_1.default)().fromFile(csvFilePath);
        console.log("1");
        // Find index with media_url == ""
        const currentPostId = posts.findIndex((post) => {
            return post.media_url === "";
        });
        console.log("2");
        if (currentPostId === -1) {
            return res.status(400).json({
                message: "No Posts To Be Uploaded",
            });
        }
        console.log("3");
        const video_url = posts[currentPostId].video_url;
        // Upload video to cloudinary
        // const cloudinaryUploadResponse = {
        //   secure_url: "hello.com",
        // };
        const cloudinaryUploadResponse = yield cloudinary_1.v2.uploader.upload(video_url, { resource_type: "video" });
        console.log("3");
        let retryCount = 0;
        // console.log("cloudinaryUploadResponse", cloudinaryUploadResponse);
        // while (!cloudinaryUploadResponse) {
        //   console.log(retryCount);
        //   retryCount++;
        //   if (retryCount > 30) {
        //     return res.status(400).json({
        //       message: "Video Upload Failed",
        //     });
        //   }
        //   await _wait(3000);
        // }
        console.log("cloudinaryUploadResponse", cloudinaryUploadResponse.secure_url);
        // Update To CSV
        posts[currentPostId].media_url = cloudinaryUploadResponse.secure_url;
        console.log("4");
        const postsInCsv = new json2csv_1.Parser({
            fields: CSVFields_1.csvFields,
        }).parse(posts);
        fs_1.default.writeFileSync(csvFilePath, postsInCsv);
        console.log("5");
        return res.status(200).json({
            message: "Video Upload Successful",
            media_url: posts[currentPostId].media_url,
        });
    }
    catch (error) {
        console.log("error");
        if (error instanceof Error) {
            return res.status(400).json({
                message: error.message,
            });
        }
        return res.status(400).json({
            message: "Video Upload Failed",
            error,
        });
    }
});
exports.uploadToCloud = uploadToCloud;
