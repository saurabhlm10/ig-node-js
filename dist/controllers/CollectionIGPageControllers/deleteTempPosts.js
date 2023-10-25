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
exports.deleteTempPosts = void 0;
const TempPost_js_1 = __importDefault(require("../../model/TempPost.js"));
const deleteTempPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page } = req.body;
        if (!page) {
            return res.status(400).send("Page name is required");
        }
        yield TempPost_js_1.default.deleteMany({
            status: "processed",
            page,
        });
        res.status(200).send("Deleted Temp Posts for " + page);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return res.status(500).json(error.message);
        }
        else {
            console.log('An unexpected error occurred', error);
        }
    }
});
exports.deleteTempPosts = deleteTempPosts;
