import express from 'express';
import { getHomepage } from '../controllers/homePageController.js';

const router = express.Router();

router.get('/view', getHomepage);

export default router;