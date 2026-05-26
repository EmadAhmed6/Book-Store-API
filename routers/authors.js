const express = require("express");
const router = express.Router();
const {
  getAllAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

router.route("/").get(getAllAuthors).post(verifyTokenAndAdmin, createAuthor);

router
  .route("/:id")
  .get(getAuthorById)
  .put(verifyTokenAndAdmin, updateAuthor)
  .delete(verifyTokenAndAdmin, deleteAuthor);

module.exports = router;
