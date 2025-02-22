import express from "express";
import { getUserProducts } from "../controllers/getUserProductController.js";

const router = express.Router();

router.get("/getUserProducts", getUserProducts);

export default router;