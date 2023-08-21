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
exports.publishPost = void 0;
const csvtojson_1 = __importDefault(require("csvtojson"));
const json2csv_1 = require("json2csv");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const publishMedia_1 = require("../../helpers/publishMedia");
const axios_1 = require("axios");
const CSVFields_1 = require("../../constants/CSVFields");
const publishPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log("1");
        const csvFilePath = path_1.default.join(process.cwd(), "/src/files", "Example.csv");
        const posts = yield (0, csvtojson_1.default)().fromFile(csvFilePath);
        // Find Post with uploaded = none
        const currentPostId = posts.findIndex((post) => {
            return post.published === "";
        });
        console.log(currentPostId);
        console.log("2");
        if (currentPostId === -1) {
            return new Response("No Posts To Be Uploaded", { status: 404 });
        }
        const creation_id = posts[currentPostId].creation_id;
        console.log(creation_id);
        // Publish Media, save published_id, update published status to Y in CSV
        const published_id = (yield (0, publishMedia_1.publishMedia)(creation_id));
        console.log("4");
        posts[currentPostId].published = "Y";
        posts[currentPostId].published_id = published_id;
        const postsInCsv2 = new json2csv_1.Parser({
            fields: CSVFields_1.csvFields,
        }).parse(posts);
        fs_1.default.writeFileSync(csvFilePath, postsInCsv2);
        console.log("5");
        return res.status(200).json({
            message: "Post Published Successfully",
            published_id,
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
exports.publishPost = publishPost;
