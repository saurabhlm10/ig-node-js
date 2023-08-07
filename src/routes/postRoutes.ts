import express from "express";
import { uploadAndPublishPost } from "../controllers/postControllers/uploadAndPublishPost";

const router = express.Router();

router.get("/uploadandpublish", uploadAndPublishPost);

export default router;
