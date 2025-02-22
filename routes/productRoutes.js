import express from 'express';
import {addProduct, viewAllProducts} from '../controllers/productController.js';
const router = express.Router();

router.post('/add', addProduct);

router.get('/get', viewAllProducts);

export default router;

