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
exports.isUploadSuccessful = void 0;
const axios_1 = __importDefault(require("axios"));
const Post_1 = __importDefault(require("../model/Post"));
/**
 * Setting retries with 3 seconds delay, as async video upload may take a while in the backend to return success
 * @param {*} n
 * @returns
 */
function _wait(n) {
    return new Promise((resolve) => setTimeout(resolve, n));
}
function setStatus(currentPostId, statusMessage) {
    return __awaiter(this, void 0, void 0, function* () {
        const post = yield Post_1.default.findById(currentPostId);
        if (!post) {
            throw new Error('Post does not exist');
        }
        switch (statusMessage) {
            case 'PUBLISHED':
                post.status = 'published';
                break;
            case 'EXPIRED':
                post.status = 'uploaded-to-cloud';
                break;
            case 'ERROR':
                post.status = 'error';
                break;
            default:
                throw new Error('Invalid status message');
        }
        yield post.save();
    });
}
/**
 * Retrieves container status for the uploaded video, while it's uploading in the backend asynchronously
 * and checks if the upload is complete.
 * @param {*} retryCount
 * @param {*} checkStatusUri
 * @returns Promise<boolean>
 */
const isUploadSuccessful = (retryCount, checkStatusUri, currentPostId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(retryCount);
        if (retryCount > 30)
            return false;
        const response = yield axios_1.default.get(checkStatusUri);
        console.log(response.data);
        if (response.data.status_code === 'PUBLISHED' ||
            response.data.status_code === 'EXPIRED') {
            // Update the published status of the post and save to DB
            yield setStatus(currentPostId, response.data.status_code);
            return true;
        }
        if (response.data.status_code === 'ERROR') {
            yield setStatus(currentPostId, response.data.status_code);
            throw new Error('Error' + response.data.status);
        }
        if (response.data.status_code !== 'FINISHED') {
            yield _wait(3000);
            return (0, exports.isUploadSuccessful)(retryCount + 1, checkStatusUri, currentPostId);
        }
        return true;
    }
    catch (e) {
        throw e;
    }
});
exports.isUploadSuccessful = isUploadSuccessful;
