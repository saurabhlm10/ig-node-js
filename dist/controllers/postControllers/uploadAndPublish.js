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
exports.uploadAndPublish = void 0;
const csvtojson_1 = __importDefault(require("csvtojson"));
const json2csv_1 = require("json2csv");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploadMedia_1 = require("../../helpers/uploadMedia");
const publishMedia_1 = require("../../helpers/publishMedia");
const uploadAndPublish = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const csvFilePath = path_1.default.join(process.cwd(), "files", "Example.csv");
        console.log("1", csvFilePath);
        const posts = yield (0, csvtojson_1.default)().fromFile(csvFilePath);
        console.log("2", posts);
        // Find Post with uploaded = none
        const currentPostId = posts.findIndex((post) => {
            return post.uploaded === "";
        });
        console.log("3", currentPostId);
        if (currentPostId === -1) {
            return new Response("No Posts To Be Uploaded", { status: 404 });
        }
        const mediaToUpload = posts[currentPostId].image_url;
        console.log("4", mediaToUpload);
        const creation_id = yield (0, uploadMedia_1.uploadMedia)(mediaToUpload, posts[currentPostId].caption);
        console.log("5", mediaToUpload);
        posts[currentPostId].creation_id = creation_id;
        posts[currentPostId].uploaded = "Y";
        console.log("6", posts);
        const postsInCsv = new json2csv_1.Parser({
            fields: ["image_url", "caption", "uploaded", "creation_id", "published"],
        }).parse(posts);
        fs_1.default.writeFileSync(csvFilePath, postsInCsv);
        console.log("7", postsInCsv);
        const r = yield (0, publishMedia_1.publishMedia)(creation_id);
        posts[currentPostId].published = "Y";
        console.log("8", posts);
        const postsInCsv2 = new json2csv_1.Parser({
            fields: ["image_url", "caption", "uploaded", "creation_id", "published"],
        }).parse(posts);
        fs_1.default.writeFileSync(csvFilePath, postsInCsv2);
        console.log(postsInCsv2);
        return new Response(JSON.stringify(postsInCsv2));
    }
    catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        }
        return new Response("Internal Server Error", { status: 500 });
    }
});
exports.uploadAndPublish = uploadAndPublish;
