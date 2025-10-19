import { Router } from "express";
import {
  getUserById,
  getUserResumes,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/data", protectRoute, getUserById);
router.get("/resume", protectRoute, getUserResumes);

export default router;
