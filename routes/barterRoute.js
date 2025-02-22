import express from "express";
import { initializeBarter, updateBarterStatus, getAllBarterRequests } from "../controllers/barterController.js";

const router = express.Router();

router.get("/initialize", initializeBarter);

router.patch("/update", updateBarterStatus);

router.get("/get", getAllBarterRequests);

export default router;