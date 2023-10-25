"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const months_1 = require("../constants/months");
const postSchema = new mongoose_1.default.Schema({
    source_reel_url: {
        type: String,
        required: true,
        unique: true,
    },
    video_url: {
        type: String,
        required: true,
    },
    page: {
        type: String,
        required: true,
    },
    publishMonth: {
        type: String,
        required: true,
        enum: months_1.months,
    },
    caption: {
        type: String,
        required: true,
    },
    media_url: {
        type: String,
        required: true,
    },
    mediaType: {
        type: String,
    },
    status: {
        type: String,
        enum: [
            "uploaded-to-cloud",
            "uploaded-media-container",
            "published",
            "error",
        ],
        default: "uploaded-to-cloud",
    },
    creation_id: {
        type: String,
    },
    published_id: {
        type: String,
    },
    uploadDate: {
        type: String,
    },
    scheduledDate: {
        month: {
            type: String,
        },
        day: {
            type: String,
        },
        time: {
            type: String,
        },
    },
}, {
    timestamps: true,
});
const Post = mongoose_1.default.model("Post", postSchema);
exports.default = Post;
