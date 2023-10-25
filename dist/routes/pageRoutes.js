"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createPage_js_1 = require("../controllers/CollectionIGPageControllers/createPage.js");
const updateAllPages_js_1 = require("../controllers/CollectionIGPageControllers/updateAllPages.js");
const router = express_1.default.Router();
router.post("/createPage", createPage_js_1.createPage);
router.get("/updateAllPages", updateAllPages_js_1.updateAllPages);
exports.default = router;
