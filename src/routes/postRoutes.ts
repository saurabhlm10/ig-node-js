import express from "express";
import { publishPost } from "../controllers/postControllers/publishPost";
import { uploadMediaContainer } from "../controllers/postControllers/uploadMediaContainer";
import { videoValidator } from "../middleware/post/upload/video-validator";
import { uploadToCloud } from "../controllers/postControllers/uploadToCloud";

const router = express.Router();

router.get("/publishPost", publishPost);
router.get("/uploadMediaContainer", uploadMediaContainer);
router.get("/uploadToCloud", videoValidator, uploadToCloud);

export default router;
