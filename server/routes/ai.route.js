import { Router } from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import {
  enhanceJobDescription,
  enhanceProfessionalSummary,
  uploadResume,
} from "../controllers/ai.controller.js";

const router = Router();

router.post("/enhance-pro-sum", protectRoute, enhanceProfessionalSummary);

router.post("/enhance-job-desc", protectRoute, enhanceJobDescription);
router.post("/upload-resume", protectRoute, uploadResume);

export default router;
