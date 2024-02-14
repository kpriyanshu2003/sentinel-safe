import express from "express";
const router = express.Router();
import { generateOTP, verifyOTP } from "../controller/auth";

router.get("/generate-otp", generateOTP);
router.get("/verify-otp", verifyOTP);

export default router;
