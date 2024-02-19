import express from "express";
import {
  createGeoCode,
  deleteGeoCode,
  getGeoCode,
  getGeoCodeByCamera,
  getGeoCodeByCampus,
  updateGeoCode,
} from "../controller/geoCode";
const router = express.Router();

router.get("/", getGeoCode);
router.get("/c/:id", getGeoCodeByCampus);
router.get("/cm/:id", getGeoCodeByCamera);
router.post("/", createGeoCode);
router.patch("/", updateGeoCode);
router.delete("/", deleteGeoCode);

export default router;
