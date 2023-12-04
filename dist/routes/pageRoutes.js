"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createPage_1 = require("../controllers/CollectionIGPageControllers/createPage");
const updateAllPages_1 = require("../controllers/CollectionIGPageControllers/updateAllPages");
const router = express_1.default.Router();
router.post('/createPage', createPage_1.createPage);
router.get('/updateAllPages', updateAllPages_1.updateAllPages);
exports.default = router;
