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
const uploadMedia_1 = require("../../helpers/uploadMedia");
const axios_1 = require("axios");
const Post_1 = __importDefault(require("../../model/Post"));
const months_1 = require("../../constants/months");
const uploadMediaContainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log("uploadMediaContainer");
        // Get Current Month
        const currentDate = new Date();
        const currentMonth = months_1.months[currentDate.getMonth()];
        // Find one post to upload from current month
        const currentPost = yield Post_1.default.findOne({
            status: "uploaded-to-cloud",
            publishMonth: currentMonth,
        });
        console.log(currentPost === null || currentPost === void 0 ? void 0 : currentPost._id);
        if (!currentPost) {
            return res.status(400).json({
                message: "No Posts To Be Uploaded",
            });
        }
        const mediaToUpload = currentPost.media_url;
        // Upload Media, save creation_id and uploaded status to CSV
        const creation_id = yield (0, uploadMedia_1.uploadMedia)(mediaToUpload, currentPost.caption);
        if (!creation_id) {
            return res.status(400).json({
                message: "Failed to upload media",
            });
        }
        currentPost.creation_id = creation_id;
        currentPost.status = "uploaded-media-container";
        yield currentPost.save();
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
