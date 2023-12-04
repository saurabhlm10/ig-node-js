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
exports.uploadMedia = void 0;
const axios_1 = __importDefault(require("axios"));
const axios_2 = require("axios");
// function to encode caption
function urlEncodeString(string) {
    return encodeURIComponent(string);
}
function removeHashtags(text) {
    return text.replace(/#[^\s#]+/g, '').trim();
}
const uploadMedia = (media_url, caption) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log('uploadMedia');
    try {
        console.log('beginn');
        const access_token = process.env.ACCESS_TOKEN;
        const ig_user_id = process.env.IG_USER_ID;
        console.log('access_token', access_token);
        console.log('ig_user_id', ig_user_id);
        const copyrightDisclaimer = `

  To request a takedown of any post, please send an email to copyright.frenchiesforthewin@gmail.com with the post url
  `;
        console.log('1');
        const tempCaption = removeHashtags(caption);
        const captionHastags = `
  
  
  Rate This 1-10 🥰

  Tag your Friends!
  
  Follow @frenchiesforthewin for more
  Follow @frenchiesforthewin for more
  Follow @frenchiesforthewin for more
  
  🔊Turn on post notifications
  
  (All rights® are reserved & belong
  to their respective owners)
  
  #frenchiesforthewin #frenchievids #frenchievideo #frenchie #frenchbulldog #frenchiedaily #frenchiesofinsta #frenchiefriends #frenchiesofinstagram #frenchielove #frenchieoftheday #frenchiegram #frenchielife #frenchiepuppy #frenchiesociety #frenchiephotos #frenchiebulldog #dogslife

  `;
        const uriEncodedCaption = urlEncodeString(tempCaption + copyrightDisclaimer + captionHastags);
        console.log('2');
        const coverUrl = '';
        const thumbOffset = '';
        const locationId = '';
        const uploadParamsString = `caption=${uriEncodedCaption}&cover_url=${coverUrl}&thumb_offset=${thumbOffset}&location_id=${locationId}&access_token=${access_token}`;
        const uploadVideoUri = `https://graph.facebook.com/v17.0/${ig_user_id}/media?media_type=REELS&video_url=${media_url}&${uploadParamsString}`;
        const uploadResponse = yield axios_1.default.post(uploadVideoUri);
        console.log('3');
        return uploadResponse.data.id;
    }
    catch (error) {
        // console.log(error);
        if (error instanceof axios_2.AxiosError) {
            console.log(JSON.stringify((_a = error.response) === null || _a === void 0 ? void 0 : _a.data));
            throw new Error((_b = error.response) === null || _b === void 0 ? void 0 : _b.data);
        }
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
});
exports.uploadMedia = uploadMedia;
