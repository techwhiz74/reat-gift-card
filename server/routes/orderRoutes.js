const express = require("express");
const {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderStatus,
  updateOrderToPaid,
  deleteOrder,
} = require("../controllers/orderController.js");
const { admin, protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id").delete(protect, deleteOrder);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/status").put(protect, admin, updateOrderStatus);

module.exports = router;
