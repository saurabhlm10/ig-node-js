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
exports.publishMedia = void 0;
const axios_1 = __importStar(require("axios"));
const isUploadSuccessful_1 = require("../utils/isUploadSuccessful");
const publishMedia = (creation_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log("publishMedia");
    const access_token = process.env.ACCESS_TOKEN;
    const ig_user_id = process.env.IG_USER_ID;
    const publish_url = `https://graph.facebook.com/v17.0/${ig_user_id}/media_publish`;
    const publish_payload = {
        creation_id,
        access_token,
    };
    // try {
    //   const r = await axios.post(publish_url, publish_payload);
    //   return r.data.id;
    // }
    const checkStatusUri = `https://graph.facebook.com/v17.0/${creation_id}?fields=status_code&access_token=${access_token}`;
    const isUploaded = yield (0, isUploadSuccessful_1.isUploadSuccessful)(0, checkStatusUri);
    console.log("1");
    // When uploaded successfully, publish the video
    try {
        if (isUploaded) {
            const publishVideoUri = `https://graph.facebook.com/v1.0/${ig_user_id}/media_publish?creation_id=${creation_id}&access_token=${access_token}`;
            const publishResponse = yield axios_1.default.post(publishVideoUri);
            return publishResponse.data.id;
        }
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            console.log(JSON.stringify((_a = error.response) === null || _a === void 0 ? void 0 : _a.data));
            throw new Error((_b = error.response) === null || _b === void 0 ? void 0 : _b.data);
        }
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
});
exports.publishMedia = publishMedia;
