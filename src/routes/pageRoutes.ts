import express from 'express';
import { createPage } from '../controllers/CollectionIGPageControllers/createPage';
import { updateAllPages } from '../controllers/CollectionIGPageControllers/updateAllPages';

const router = express.Router();

router.post('/', createPage);
router.get('/updateAllPages', updateAllPages);

export default router;
