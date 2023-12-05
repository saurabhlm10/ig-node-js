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
exports.uploadReelToDB = void 0;
const constants_1 = require("../constants");
const TempPost_1 = __importDefault(require("../model/TempPost"));
const uploadToCloud_1 = require("./uploadToCloud");
function uploadReelToDB(reel, page) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentDate = new Date();
        const currentMonthName = constants_1.months[currentDate.getMonth()];
        try {
            // Upload video to cloudinary
            const media_url = yield (0, uploadToCloud_1.uploadToCloud)(reel.videoUrl);
            const mediaType = 'reel';
            // Add Post to Mongo
            const post = {
                source_reel_url: reel.url,
                video_url: reel.videoUrl,
                media_url: media_url,
                mediaType: mediaType,
                page: page,
                publishMonth: currentMonthName,
                caption: reel.caption,
            };
            yield TempPost_1.default.create(post);
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
            else {
                console.log('An unexpected error occurred', error);
            }
        }
    });
}
exports.uploadReelToDB = uploadReelToDB;
