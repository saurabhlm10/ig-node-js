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
exports.uploadMediaContainer = void 0;
const path_1 = __importDefault(require("path"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const uploadMedia_1 = require("../../helpers/uploadMedia");
const json2csv_1 = require("json2csv");
const CSVFields_1 = require("../../constants/CSVFields");
const fs_1 = __importDefault(require("fs"));
const axios_1 = require("axios");
const uploadMediaContainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log("uploadMediaContainer");
        const csvFilePath = path_1.default.join(process.cwd(), "/src/files", "Example.csv");
        const posts = yield (0, csvtojson_1.default)().fromFile(csvFilePath);
        // Find Post with uploaded = none
        const currentPostId = posts.findIndex((post) => {
            return post.uploaded === "";
        });
        if (currentPostId === -1) {
            return res.status(400).json({
                message: "No Posts To Be Uploaded",
            });
        }
        const mediaToUpload = posts[currentPostId].media_url;
        // Upload Media, save creation_id and uploaded status to CSV
        const creation_id = (yield (0, uploadMedia_1.uploadMedia)(mediaToUpload, posts[currentPostId].caption, res));
        posts[currentPostId].creation_id = creation_id;
        posts[currentPostId].uploaded = "Y";
        const postsInCsv = new json2csv_1.Parser({
            fields: CSVFields_1.csvFields,
        }).parse(posts);
        fs_1.default.writeFileSync(csvFilePath, postsInCsv);
        return res.status(200).json({
            message: "Media Uploaded successfully",
            creation_id,
        });
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            return res.status(400).json((_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
        }
        if (error instanceof Error) {
            return res.status(400).json(error.message);
        }
    }
});
exports.uploadMediaContainer = uploadMediaContainer;
