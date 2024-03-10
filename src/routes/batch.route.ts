import express from "express";
import { createBatch } from "../controllers/batchControllers/create-batch.controller";
import { addPageToBatch } from "../controllers/batchControllers/add-page-to-batch.controller";
import { getAllBatches } from "../controllers/batchControllers/get-all-batches.controller";
import { getPageAccessToken } from "../controllers/batchControllers/get-page-access-token.controller";
import { updateAccessToken } from "../controllers/batchControllers/update-access-token.controller";
const router = express.Router();

router.post("/", createBatch);
router.put("/addPageToBatch", addPageToBatch);
router.get("/", getAllBatches);
router.get("/getPageAccessToken/:page", getPageAccessToken);
router.put("/updateAccessToken", updateAccessToken);

export default router;
