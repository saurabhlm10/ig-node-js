import express from 'express';
import { clearCache } from '../controllers/cacheControllers/clearCache';
const router = express.Router();

router.delete('/', clearCache);

export default router;