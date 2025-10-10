import express from "express";
import {
  createSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
} from "../controllers/subCategoryController.js";

const router = express.Router();

// Create a new sub-category
router.post("/", createSubCategory);
// Get all sub-categories
router.get("/", getAllSubCategories);
// Get a sub-category by ID
router.get("/:id", getSubCategoryById);

// Update a sub-category by ID
router.put("/:id", updateSubCategory);
// Delete a sub-category by ID
router.delete("/:id", deleteSubCategory);
export default router;
