"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadAndPublishPost_1 = require("../controllers/postControllers/uploadAndPublishPost");
const cloudUpload_1 = require("../controllers/postControllers/cloudUpload");
const fileGetter_1 = require("../middleware/post/upload/fileGetter");
const router = express_1.default.Router();
router.get("/uploadandpublish", fileGetter_1.fileGetter, uploadAndPublishPost_1.uploadAndPublishPost);
router.get("/allmediauploader", fileGetter_1.fileGetter, cloudUpload_1.cloudUpload);
exports.default = router;
