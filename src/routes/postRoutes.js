const express = require("express");
const { publishPost } = require("../controllers/postControllers/publishPost");
const { uploadMediaContainer } = require("../controllers/postControllers/uploadMediaContainer");
const { videoValidator } = require("../middleware/post/upload/video-validator");
const { uploadToCloud } = require("../controllers/postControllers/uploadToCloud");

const router = express.Router();

router.get("/publishPost/:t", publishPost);
router.get("/uploadMediaContainer/:t", uploadMediaContainer);
router.get("/uploadToCloud/:t", videoValidator, uploadToCloud);

module.exports = router;
