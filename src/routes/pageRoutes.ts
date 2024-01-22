import express from 'express';
import { createPage } from '../controllers/CollectionIGPageControllers/createPage';
import { updateAllCollectionPages } from '../controllers/CollectionIGPageControllers/updateAllPages';
import { createIGPage } from '../controllers/IGPageControllers/createIGPage.controller';

const router = express.Router();

router.post('/', createPage);
router.get('/updateAllCollectionPages', updateAllCollectionPages);
router.post('/createIGPage', createIGPage);

export default router;
