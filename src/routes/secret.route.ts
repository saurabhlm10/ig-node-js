import express from "express";
const router = express.Router();

import { createSecret } from "../controllers/secretControllers/create-secret.controller";
import { getSecret } from "../controllers/secretControllers/get-secret.controller";
import { updateSecret } from "../controllers/secretControllers/update-secret.controller";
import { deleteSecret } from "../controllers/secretControllers/delete-secret.controller";

router.post("/", createSecret);
router.get("/", getSecret);
router.put("/", updateSecret);
router.delete("/", deleteSecret);

export default router;
