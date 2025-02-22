import express from "express";
import { getProducts } from "../controllers/searchController.js";

const router = express.Router();

router.get("/search", getProducts); // GET /api/products/search?search=your_query

export default router;