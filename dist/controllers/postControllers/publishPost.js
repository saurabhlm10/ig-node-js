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
const publishMedia_1 = require("../../helpers/publishMedia");
const axios_1 = require("axios");
const Post_1 = __importDefault(require("../../model/Post"));
const months_1 = require("../../constants/months");
const publishPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log("1");
        const currentDate = new Date();
        const currentMonth = months_1.months[currentDate.getMonth()];
        const currentPost = yield Post_1.default.findOne({
            status: "uploaded-media-container",
            publishMonth: currentMonth,
        });
        console.log(currentPost);
        console.log("2");
        if (!currentPost) {
            return res.status(404).json({ message: "No Posts To Be Uploaded" });
        }
        const creation_id = currentPost.creation_id;
        console.log("creation_id", creation_id);
        // Publish Media, save published_id, update published status to Y in CSV
        const published_id = yield (0, publishMedia_1.publishMedia)(creation_id, Number(currentPost._id));
        console.log("4");
        currentPost.status = "published";
        currentPost.published_id = published_id;
        yield currentPost.save();
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
