import express from "express";
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

// Routes CRUD
router.post("/", createCategory);          // create
router.get("/", getAllCategories);        // all
router.put("/:id", updateCategory);       // modify
router.delete("/:id", deleteCategory);    // delete

export default router;
