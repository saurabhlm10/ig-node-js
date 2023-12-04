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
exports.publishMedia = void 0;
const axios_1 = __importDefault(require("axios"));
const axios_2 = require("axios");
const isUploadSuccessful_1 = require("../utils/isUploadSuccessful");
const publishMedia = (creation_id, currentPostId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log('publishMedia');
    const access_token = process.env.ACCESS_TOKEN;
    const ig_user_id = process.env.IG_USER_ID;
    try {
        const checkStatusUri = `https://graph.facebook.com/v17.0/${creation_id}?fields=status,status_code&access_token=${access_token}`;
        const isUploaded = yield (0, isUploadSuccessful_1.isUploadSuccessful)(0, checkStatusUri, currentPostId);
        console.log('isUploaded', isUploaded);
        console.log('1');
        // When uploaded successfully, publish the video
        if (isUploaded) {
            const publishVideoUri = `https://graph.facebook.com/v17.0/${ig_user_id}/media_publish?creation_id=${creation_id}&access_token=${access_token}`;
            const publishResponse = yield axios_1.default.post(publishVideoUri);
            console.log('publishedid', publishResponse.data.id);
            return publishResponse.data.id;
        }
    }
    catch (error) {
        if (error instanceof axios_2.AxiosError) {
            console.log(JSON.stringify((_a = error.response) === null || _a === void 0 ? void 0 : _a.data));
            throw new Error((_b = error.response) === null || _b === void 0 ? void 0 : _b.data);
        }
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
});
exports.publishMedia = publishMedia;
