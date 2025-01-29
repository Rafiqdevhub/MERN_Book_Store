import express from "express";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from "../controllers/booksControllers.js";

const router = express.Router();

router.post("/create-book", createBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.put("/update-book/:id", updateBook);
router.delete("/delete-book/:id", deleteBook);

export default router;
