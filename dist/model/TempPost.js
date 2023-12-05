"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../constants");
const tempPostSchema = new mongoose_1.default.Schema({
    source_reel_url: {
        type: String,
        required: true,
        unique: true,
    },
    video_url: {
        type: String,
        required: true,
        unique: true,
    },
    media_url: {
        type: String,
        required: true,
        unique: true,
    },
    mediaType: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['not-processed', 'processed'],
        default: 'not-processed',
    },
    page: {
        type: String,
        required: true,
    },
    publishMonth: {
        type: String,
        required: true,
        enum: constants_1.months,
    },
    caption: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const TempPost = mongoose_1.default.model('TempPost', tempPostSchema);
exports.default = TempPost;
