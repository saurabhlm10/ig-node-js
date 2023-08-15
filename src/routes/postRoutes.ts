import express from "express";
import { uploadAndPublishPost } from "../controllers/postControllers/uploadAndPublishPost";
import { cloudUpload } from "../controllers/postControllers/cloudUpload";
import { fileGetter } from "../middleware/post/upload/fileGetter";

const router = express.Router();

router.get("/uploadandpublish", fileGetter, uploadAndPublishPost);
router.get("/allmediauploader", fileGetter, cloudUpload);

export default router;
