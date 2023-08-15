"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const axios_1 = __importStar(require("axios"));
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
    // Make API call to get video_url
    const source_reel_url = posts[currentPostId].source_reel_url;
    const jsonModifier = "?__a=1&__d=dis";
    const videoJsonUrl = source_reel_url + jsonModifier;
    try {
        const videoJson = yield axios_1.default.get(videoJsonUrl);
        const video_url = videoJson.data.graphql.shortcode_media.video_url;
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
