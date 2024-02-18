import express from "express";
import {
  createLocMetrics,
  deleteLocMetrics,
  getLocMetrics,
  getLocMetricsByCampus,
  getLocMetricsByCoordinates,
  getLocMetricsByRisk,
  getLocMetricsbyTime,
  updateLocMetrics,
} from "../controller/LocMetrics";
const router = express.Router();

router.get("/", getLocMetrics);
router.get("/c/:id", getLocMetricsByCampus);
router.get("/r/:id", getLocMetricsByRisk);
router.get("/t/:id", getLocMetricsbyTime);
router.get("/o/:id", getLocMetricsByCoordinates);
router.post("/", createLocMetrics);
router.patch("/", updateLocMetrics);
router.delete("/:id", deleteLocMetrics);

export default router;
