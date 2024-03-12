import express from "express";
import { createPage } from "../controllers/CollectionIGPageControllers/createPage";
import { updateAllCollectionPages } from "../controllers/CollectionIGPageControllers/updateAllPages";
import { createIGPage } from "../controllers/IGPageControllers/createIGPage.controller";
import { getIGPage } from "../controllers/IGPageControllers/getIGPage.controller";
import { updateIGPage } from "../controllers/IGPageControllers/updateIGPage.controller";
import { deleteIGPage } from "../controllers/IGPageControllers/deleteIGPage.controller";
import { getAllIGPages } from "../controllers/IGPageControllers/getAllIGPages.controller";

const router = express.Router();

router.post("/", createPage);
router.get("/updateAllCollectionPages", updateAllCollectionPages);
router.get("/", getAllIGPages);
router.post("/createIGPage", createIGPage);
router.get("/:page", getIGPage);
router.put("/:page", updateIGPage);
router.delete("/:page", deleteIGPage);

export default router;
