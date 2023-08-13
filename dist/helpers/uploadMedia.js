"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMedia = void 0;
const axios_1 = __importStar(require("axios"));
const uploadMedia = (image_url, caption) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const access_token = process.env.ACCESS_TOKEN;
    const ig_user_id = process.env.IG_USER_ID;
    const post_url = `https://graph.facebook.com/v17.0/${ig_user_id}/media?media_type=REELS`;
    console.log(image_url);
    const payload = {
        video_url: image_url,
        caption,
        access_token: access_token,
    };
    // try {
    //   const r = await axios.post(post_url, payload);
    //   return r.data.id;
    // }
    const coverUrl = '';
    const thumbOffset = '';
    const locationId = '';
    const uploadParamsString = `caption=${caption}&cover_url=${coverUrl}&thumb_offset=${thumbOffset}&location_id=${locationId}&access_token=${access_token}`;
    const uploadVideoUri = `https://graph.facebook.com/v17.0/${ig_user_id}/media?media_type=REELS&video_url=${image_url}&${uploadParamsString}`;
    try {
        const uploadResponse = yield axios_1.default.post(uploadVideoUri);
        console.log(uploadResponse.data);
        return uploadResponse.data.id;
    }
    catch (error) {
        // console.log(error);
        if (error instanceof axios_1.AxiosError) {
            console.log((_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
        }
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
});
exports.uploadMedia = uploadMedia;
