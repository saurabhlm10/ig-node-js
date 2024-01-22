import express from 'express';
import { createBatch } from '../controllers/batchControllers/createBatch';
import { addPageToBatch } from '../controllers/batchControllers/add-pages-to-batch.controller';
const router = express.Router();

router.post('/', createBatch);
router.put('/addPageToBatch/:batch', addPageToBatch)

export default router;