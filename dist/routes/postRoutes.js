"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const publishPost_1 = require("../controllers/postControllers/publishPost");
const uploadMediaContainer_1 = require("../controllers/postControllers/uploadMediaContainer");
const video_validator_1 = require("../middleware/post/upload/video-validator");
const uploadToCloud_1 = require("../controllers/postControllers/uploadToCloud");
const router = express_1.default.Router();
router.get("/publishPost", publishPost_1.publishPost);
router.get("/uploadMediaContainer", uploadMediaContainer_1.uploadMediaContainer);
router.get("/uploadToCloud", video_validator_1.videoValidator, uploadToCloud_1.uploadToCloud);
exports.default = router;
