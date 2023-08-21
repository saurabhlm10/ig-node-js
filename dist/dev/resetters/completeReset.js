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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const json2csv_1 = require("json2csv");
const CSVFields_1 = require("../../constants/CSVFields");
const prompt = (0, prompt_sync_1.default)();
function completeReset(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        const csvFilePath = path_1.default.join(process.cwd(), "/src/files", "Example.csv");
        const posts = yield (0, csvtojson_1.default)().fromFile(csvFilePath);
        posts[postId].media_url = "";
        posts[postId].creation_id = "";
        posts[postId].published = "";
        posts[postId].published_id = "";
        posts[postId].uploaded = "";
        const postsInCsv = new json2csv_1.Parser({
            fields: CSVFields_1.csvFields,
        }).parse(posts);
        fs_1.default.writeFileSync(csvFilePath, postsInCsv);
    });
}
const postId = Number(prompt("Enter postId"));
completeReset(postId);
