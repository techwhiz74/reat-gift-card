const express = require("express");

const {
  createSupplement,
  deleteSupplement,
  getSupplementById,
  getSupplements,
  getAllSupplements,
  updateSupplement,
} = require("../controllers/supplementController.js");
const { protect, admin } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/", getSupplements);
router.get("/all", getAllSupplements);
router.post("/", protect, admin, createSupplement);

router.get("/:id", getSupplementById);
router.delete("/:id", protect, admin, deleteSupplement);
router.put("/:id", updateSupplement);

module.exports = router;
