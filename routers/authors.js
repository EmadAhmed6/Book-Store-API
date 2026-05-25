const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor,
} = require("../model/Author");
const { verifyTokenAndAdmin } = require("../middlewars/verifyToken");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const authors = await Author.find();
    res.status(200).json(authors);
  }),
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  }),
);

router.post(
  "/",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validateCreateAuthor(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const newAuthor = new Author({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      phoneNumber: req.body.phoneNumber,
    });
    const result = await newAuthor.save();
    res.status(201).json(result);
  }),
);

router.put(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validateUpdateAuthor(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          age: req.body.age,
          phoneNumber: req.body.phoneNumber,
        },
      },
      { new: true },
    );
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  }),
);
router.delete(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
      await Author.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Author deleted successfully" });
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  }),
);

module.exports = router;
