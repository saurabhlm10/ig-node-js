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
exports.videoValidator = void 0;
const path_1 = __importDefault(require("path"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const axios_1 = __importDefault(require("axios"));
const axios_2 = require("axios");
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const CSVFields_1 = require("../../../constants/CSVFields");
const json2csv_1 = require("json2csv");
const { v2: cloudinary } = cloudinary_1.default;
// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
function videoResponseGetter(video_url, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield axios_1.default.get(video_url);
        return next();
    });
}
const videoValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Read CSV
    let posts = [];
    let currentPostId = -1;
    let csvFilePath = "";
    try {
        csvFilePath = path_1.default.join(process.cwd(), "/src/files", "Example.csv");
        console.log("1");
        posts = yield (0, csvtojson_1.default)().fromFile(csvFilePath);
        // Find index with media_url == ""
        currentPostId = posts.findIndex((post) => post.media_url === "");
        console.log("2");
        if (currentPostId === -1) {
            return next();
        }
        console.log("3");
        const video_url = posts[currentPostId].video_url;
        yield axios_1.default.get(video_url);
        console.log("4");
        // await videoResponseGetter(video_url, next);
        return next();
    }
    catch (error) {
        if (error instanceof axios_2.AxiosError) {
            // Mark current post as invalid
            posts[currentPostId].media_url = "Invalid";
            const postsInCsv = new json2csv_1.Parser({ fields: CSVFields_1.csvFields }).parse(posts);
            fs_1.default.writeFileSync(csvFilePath, postsInCsv);
            return res.status(403).json({ message: (_a = error.response) === null || _a === void 0 ? void 0 : _a.data });
        }
        if (error instanceof Error) {
            console.log(error.message);
            return res.status(403).json({ message: error.message });
        }
    }
});
exports.videoValidator = videoValidator;
