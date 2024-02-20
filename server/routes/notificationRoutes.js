const express = require("express");

const {
  createNotification,
  deleteNotification,
  getNotifications,
  updateNotification,
} = require("../controllers/notificationController.js");
const { protect, admin } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/", protect, admin, getNotifications);
router.post("/", protect, createNotification);

router.put("/:id", protect, admin, updateNotification);
router.delete("/:id", protect, admin, deleteNotification);

module.exports = router;
