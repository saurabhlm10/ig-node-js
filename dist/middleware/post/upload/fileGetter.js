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
exports.fileGetter = void 0;
const path_1 = __importDefault(require("path"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const axios_1 = require("axios");
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = require("cloudinary/");
const CSVFields_1 = require("../../../constants/CSVFields");
const json2csv_1 = require("json2csv");
const responseObject = {
    success: false,
    message: "",
};
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const fileGetter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Read CSV
    const csvFilePath = path_1.default.join(process.cwd(), "/src/files", "Example.csv");
    const posts = yield (0, csvtojson_1.default)().fromFile(csvFilePath);
    // Find index with media_url == ""
    const currentPostId = posts.findIndex((post) => {
        return post.media_url === "";
    });
    if (currentPostId === -1) {
        return next();
    }
    const video_url = posts[currentPostId].video_url;
    try {
        // Upload video to cloudinary
        const cloudinaryUploadResponse = yield cloudinary_1.v2.uploader.upload(video_url, { resource_type: "video" });
        // Update To CSV
        posts[currentPostId].media_url = cloudinaryUploadResponse.secure_url;
        const postsInCsv = new json2csv_1.Parser({
            fields: CSVFields_1.csvFields,
        }).parse(posts);
        fs_1.default.writeFileSync(csvFilePath, postsInCsv);
        return next();
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            return res.status(403).json({
                message: (_a = error.response) === null || _a === void 0 ? void 0 : _a.data,
            });
        }
        if (error instanceof Error) {
            console.log(error);
            return res.status(403).json({
                message: error.message,
            });
        }
    }
});
exports.fileGetter = fileGetter;
