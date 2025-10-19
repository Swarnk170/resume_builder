import { Router } from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import {
  createResume,
  deleteResume,
  getPublicResumeById,
  getResumeById,
  updateResume,
} from "../controllers/resume.controller.js";
import upload from "../middlewares/multer.js";

const router = Router();

router.post("/create", protectRoute, createResume);
router.put("/update", upload.single("image"), protectRoute, updateResume);
router.delete("/delete/:resumeId", protectRoute, deleteResume);
router.get("/get/:resumeId", protectRoute, getResumeById);
router.get("/public/:resumeId", getPublicResumeById);

export default router;
