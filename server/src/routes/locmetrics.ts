import express from "express";
import {
  createLocMetrics,
  deleteLocMetrics,
  getLatestData,
  getLocMetrics,
  getLocMetricsByCampus,
  getLocMetricsByCoordinates,
  getLocMetricsByRisk,
  getLocMetricsbyTime,
  updateLocMetrics,
  updateLocMetricsByCampus,
} from "../controller/LocMetrics";
const router = express.Router();

router.get("/", getLocMetrics);
router.get("/c/:id", getLocMetricsByCampus);
router.get("/r/:id", getLocMetricsByRisk);
router.get("/t/:id", getLocMetricsbyTime);
router.get("/o/", getLocMetricsByCoordinates);
router.get("/l/", getLatestData);
router.post("/", createLocMetrics);
router.patch("/c/:id", updateLocMetricsByCampus);
router.patch("/:id", updateLocMetrics);
router.delete("/:id", deleteLocMetrics);

export default router;
