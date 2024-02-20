const express = require("express");
const {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
  sendRequestMail,
  resetPassword,
  shippedConfirmMail,
} = require("../controllers/userController.js");
const { admin, protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/", registerUser);
router.route("/").get(protect, admin, getUsers);

router.post("/login", authUser);
router.post("/send-reset-mail", sendRequestMail);
router.post("/reset", resetPassword);

router.post("/shipped-confirm-mail", shippedConfirmMail);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, getUserById)
  .put(protect, updateUser);

module.exports = router;
