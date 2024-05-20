import express from 'express';
import multer from 'multer';
import { getConfig, retrieveImage, uploadImage } from './controller.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/config', getConfig);
router.post('/retrieve', retrieveImage);
router.post('/upload', upload.single('image'), uploadImage);

export default router;
