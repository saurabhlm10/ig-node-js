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
/**
 * Setting retries with 3 seconds delay, as async video upload may take a while in the backed to return success
 * @param {*} n
 * @returns
 */
function _wait(n) {
    return new Promise((resolve) => setTimeout(resolve, n));
}
/**
 * Retrieves container status for the uploaded video, while its uploading in the backend asynchronously
 * and checks if the upload is complete.
 * @param {*} retryCount
 * @param {*} checkStatusUri
 * @returns Promise<boolean>
 */
const isUploadSuccessful = (retryCount, checkStatusUri) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(retryCount);
        if (retryCount > 30)
            return false;
        const response = yield axios_1.default.get(checkStatusUri);
        if (response.data.status_code != "FINISHED") {
            yield _wait(3000);
            yield (0, exports.isUploadSuccessful)(retryCount + 1, checkStatusUri);
        }
        return true;
    }
    catch (e) {
        throw e;
    }
});
exports.isUploadSuccessful = isUploadSuccessful;
