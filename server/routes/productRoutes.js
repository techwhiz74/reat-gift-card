const express = require("express");

const {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getAllProducts,
  getTopProducts,
  updateProduct,
} = require("../controllers/productController.js");
const { protect, admin } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/", getProducts);
router.get("/all", getAllProducts);
router.post("/", protect, admin, createProduct);
router.post("/:id/reviews", protect, createProductReview);
router.get("/top", getTopProducts);

router.get("/:id", getProductById);
router.delete("/:id", protect, admin, deleteProduct);
router.put("/:id", updateProduct);

module.exports = router;
