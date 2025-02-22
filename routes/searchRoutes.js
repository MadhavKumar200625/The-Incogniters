import express from "express";
import { getProducts } from "../controllers/searchController.js";

const router = express.Router();

router.get("/search", getProducts); 

export default router;