import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getCurrentUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/current", authMiddleware, getCurrentUser);

export default router;
