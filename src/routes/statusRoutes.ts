import express from 'express';
import { getStatus } from '../controllers/statusControllers/getStatus.controller';

const router = express.Router();

router.get('/', getStatus);

export default router;
