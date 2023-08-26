const express = require("express");
const { publishPost } = require("../controllers/postControllers/publishPost");
const { uploadMediaContainer } = require("../controllers/postControllers/uploadMediaContainer");
const { videoValidator } = require("../middleware/post/upload/video-validator");
const { uploadToCloud } = require("../controllers/postControllers/uploadToCloud");
const { createPost } = require("../controllers/postControllers/createPost");
const { deletePost } = require("../controllers/postControllers/deletePost");

const router = express.Router();

router.get("/publishPost/:t", publishPost);
router.get("/uploadMediaContainer/:t", uploadMediaContainer);
router.get("/uploadToCloud/:t", videoValidator, uploadToCloud);
router.post('/createPost', createPost)
router.post('/deletePost', deletePost)

module.exports = router;
