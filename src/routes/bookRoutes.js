import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createBook,
  getBooks,
  getMyBooks,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

const router = express.Router();
// publique route
router.get("/", getBooks);

// Routes CRUD
router.use(authMiddleware)
router.post("/", createBook);          // create
router.get("/myBooks", getMyBooks);       // all  
router.put("/:id", updateBook);       // modify
router.delete("/:id", deleteBook);    // delete

export default router;