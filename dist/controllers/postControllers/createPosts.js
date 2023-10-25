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
exports.createPosts = void 0;
const months_js_1 = require("../../constants/months.js");
const Post_js_1 = __importDefault(require("../../model/Post.js"));
const TempPost_js_1 = __importDefault(require("../../model/TempPost.js"));
const createPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = "frenchiesforthewin";
        if (!page) {
            return res.status(400).send("Page name is required");
        }
        // Get Current Month
        const currentDate = new Date();
        const currentMonth = months_js_1.months[currentDate.getMonth()];
        // Get all TempPosts for one page for current month with status "not-processed"
        const tempPosts = yield TempPost_js_1.default.find({
            status: "not-processed",
            publishMonth: currentMonth,
            page: page,
        });
        if (tempPosts.length === 0) {
            return res.status(400).send("No posts to process");
        }
        // Prepare array for insertMany
        const postsToInsert = tempPosts.map((tempPost) => ({
            source_reel_url: tempPost.source_reel_url,
            video_url: tempPost.video_url,
            media_url: tempPost.media_url,
            status: "uploaded-to-cloud",
            page: tempPost.page,
            publishMonth: tempPost.publishMonth,
            caption: tempPost.caption,
            mediaType: tempPost.mediaType,
        }));
        try {
            const newPosts = yield Post_js_1.default.insertMany(postsToInsert);
            console.log(newPosts);
            // Update all tempPosts status to "processed"
            for (let tempPost of tempPosts) {
                tempPost.status = "processed";
                yield tempPost.save();
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
            else {
                console.log('An unexpected error occurred', error);
            }
        }
        return res.status(200).send("All posts processed");
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json(error.message);
        }
    }
});
exports.createPosts = createPosts;
