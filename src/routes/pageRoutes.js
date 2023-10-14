const express = require("express");
const { createPage } = require("../controllers/IGPageControllers/createPage");
const {
  updateAllPages,
} = require("../controllers/IGPageControllers/updateAllPages");
const router = express.Router();

router.post("/createPage", createPage);
router.get("/updateAllPages", updateAllPages);

module.exports = router;
