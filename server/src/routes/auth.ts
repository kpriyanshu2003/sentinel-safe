import express from "express";
const router = express.Router();
import { generateOTP, verifyOTP } from "../controller/auth";

router.get("/generateOTP", generateOTP);
router.get("/verifyOTP", verifyOTP);

export default router;
