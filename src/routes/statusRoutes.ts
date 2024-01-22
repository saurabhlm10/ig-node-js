import express from 'express';
import { getStatus } from '../controllers/statusControllers/getStatus.controller';
import { getUpdatePageStatus } from '../controllers/statusControllers/getUpdatePageStatus.controller';

const router = express.Router();

router.get('/', getStatus);
router.get('/updatepagestatus', getUpdatePageStatus);

export default router;
