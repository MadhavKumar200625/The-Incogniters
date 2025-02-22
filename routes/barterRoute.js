import express from "express";
import { initializeBarter, updateBarterStatus } from "../controllers/barterController.js";

const router = express.Router();

router.post("/initialize", initializeBarter);

router.patch("/update", updateBarterStatus);

export default router;