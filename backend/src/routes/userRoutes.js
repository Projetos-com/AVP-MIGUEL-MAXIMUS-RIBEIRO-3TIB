import express from "express";
import authMiddleware, { requireRole } from "../middlewares/authMiddleware.js";
import { getAdmin, getProfile } from "../controllers/userController.js";

const router = express.Router();

router.get(["/profile", "/perfil"], authMiddleware, getProfile);
router.get("/admin", authMiddleware, requireRole("ADMIN"), getAdmin);

export default router;
