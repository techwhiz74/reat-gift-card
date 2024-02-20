const express = require("express");

const {
  createAddress,
  deleteAddress,
  getAddressById,
  getAddresses,
  updateAddress,
} = require("../controllers/addressController.js");
const { protect, admin } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/:user", protect, getAddresses);
router.post("/", protect, createAddress);

router.get("/detail/:id", protect, getAddressById);
router.delete("/:id", protect, deleteAddress);
router.put("/:id", protect, updateAddress);

module.exports = router;
