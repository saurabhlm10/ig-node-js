import express from "express";
import { createCollectionIGPage } from "../controllers/CollectionIGPageControllers/createCollectionIGPage";
import { updateAllCollectionPages } from "../controllers/CollectionIGPageControllers/updateAllPages";
import { createIGPage } from "../controllers/IGPageControllers/createIGPage.controller";
import { getIGPage } from "../controllers/IGPageControllers/getIGPage.controller";
import { updateIGPage } from "../controllers/IGPageControllers/updateIGPage.controller";
import { deleteIGPage } from "../controllers/IGPageControllers/deleteIGPage.controller";
import { getAllIGPages } from "../controllers/IGPageControllers/getAllIGPages.controller";
import { getCollectionIGPage } from "../controllers/CollectionIGPageControllers/getCollectionIGPage.controller";
import { updateCollectionIGPage } from "../controllers/CollectionIGPageControllers/updateCollectionIGPage.controller";
import { deleteCollectionIGPage } from "../controllers/CollectionIGPageControllers/deleteCollectionIGPage.controller";

const router = express.Router();

router.post("/", createCollectionIGPage);
router.get("/collectionIGPage/:page", getCollectionIGPage);
router.put("/collectionIGPage/:page", updateCollectionIGPage);
router.delete("/collectionIGPage/:page", deleteCollectionIGPage);
router.get("/updateAllCollectionPages", updateAllCollectionPages);
router.get("/", getAllIGPages);
router.post("/createIGPage", createIGPage);
router.get("/:page", getIGPage);
router.put("/:page", updateIGPage);
router.delete("/:page", deleteIGPage);

export default router;
