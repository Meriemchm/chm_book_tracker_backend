import express from "express";
import {
  getReadingStatuses,
  updateReadingStatus,
  createReadingStatus,
  deleteReadingStatus,
} from "../controllers/readingStatusController.js";

const router = express.Router();

router.get("/", getReadingStatuses);
router.post("/", createReadingStatus);
router.put("/:id", updateReadingStatus);
router.delete("/:id", deleteReadingStatus);
export default router;
