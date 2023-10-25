import express from "express";
import { publishPost } from "../controllers/postControllers/publishPost";
import { uploadMediaContainer } from "../controllers/postControllers/uploadMediaContainer";
import { videoValidator } from "../middleware/post/upload/video-validator";
import { uploadToCloud } from "../controllers/postControllers/uploadToCloud";
import { createPost } from "../controllers/postControllers/createPost";
import { deletePost } from "../controllers/postControllers/deletePost";
import { getPostById } from "../controllers/postControllers/getPostById";
import { collectPosts } from "../controllers/CollectionIGPageControllers/collectPosts";
import { createPosts } from "../controllers/postControllers/createPosts";
import { deleteTempPosts } from "../controllers/CollectionIGPageControllers/deleteTempPosts";

const router = express.Router();

router.get("/publishPost", publishPost);
router.get("/uploadMediaContainer", uploadMediaContainer);
router.get("/uploadToCloud", videoValidator, uploadToCloud);
router.post("/createPost", createPost);
router.post("/deletePost", deletePost);
router.get("/getPostById/:id", getPostById);
router.get("/collectPosts", collectPosts);
router.get("/createPosts", createPosts);
router.get("/deleteTempPosts", deleteTempPosts);

export default router;
