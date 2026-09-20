import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post(["/register", "/usuarios"], register);
router.post("/login", login);

export default router;
