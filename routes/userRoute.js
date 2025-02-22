import { sendOtp, checkOtp, checkPhoneNumber } from "../controllers/userController.js";
import express from "express";

const router = express.Router();


router.route("/check-otp").post(checkOtp);
router.route("/check-phone-number").get(checkPhoneNumber);
router.route("/send-otp").get(sendOtp);


export default router