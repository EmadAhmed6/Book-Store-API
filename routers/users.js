const express = require("express");
const router = express.Router();
const { mongoose } = require("mongoose");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
// /users/:id
router
  .route("/:id")
  .get(verifyTokenAndAuthorization, getUserById)
  .put(verifyTokenAndAuthorization, updateUser)
  .delete(verifyTokenAndAuthorization, deleteUser);

// /users
router.get("/", verifyTokenAndAdmin, getAllUsers);

module.exports = router;
