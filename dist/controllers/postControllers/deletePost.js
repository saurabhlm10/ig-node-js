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
exports.deletePost = void 0;
const axios_1 = require("axios");
const Post_1 = __importDefault(require("../../model/Post"));
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { source_reel_url } = req.body;
        yield Post_1.default.deleteOne({ source_reel_url });
        res.status(200).json({
            message: "Post Deleted"
        });
    }
    catch (error) {
        console.error(error);
        if (error instanceof axios_1.AxiosError) {
            return res.status(400).json((_a = error.response) === null || _a === void 0 ? void 0 : _a.data.message);
        }
        if (error instanceof Error) {
            return res.status(400).json(error.message);
        }
    }
});
exports.deletePost = deletePost;
