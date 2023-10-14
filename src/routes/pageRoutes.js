const express = require("express");
const { createPage } = require("../controllers/CollectionIGPageControllers/createPage");
const {
  updateAllPages,
} = require("../controllers/CollectionIGPageControllers/updateAllPages");
const router = express.Router();

router.post("/createPage", createPage);
router.get("/updateAllPages", updateAllPages);

module.exports = router;
