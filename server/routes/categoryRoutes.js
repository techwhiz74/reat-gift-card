const express = require("express");

const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getCategories,
} = require("../controllers/categoryController.js");

const { protect, admin } = require("../middleware/authMiddleware.js");
const router = express.Router();

router.get("/", getCategories);
router.post("/", protect, admin, createCategory);

router.get("/:id", getCategoryById);
router.delete("/:id", protect, admin, deleteCategory);
router.put("/:id", protect, admin, updateCategory);

module.exports = router;
