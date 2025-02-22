import express from 'express';
import { getProductDetails } from '../controllers/getProductController.js';

const router = express.Router();

router.get('/getProduct', getProductDetails);

export default router;