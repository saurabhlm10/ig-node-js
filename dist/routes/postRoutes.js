"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadAndPublishPost_1 = require("../controllers/postControllers/uploadAndPublishPost");
const router = express_1.default.Router();
router.get("/uploadandpublish", uploadAndPublishPost_1.uploadAndPublishPost);
exports.default = router;
