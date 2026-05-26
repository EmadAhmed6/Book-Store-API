const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { validateBook, validateUpdateBook, Book } = require("../model/Book");
const asyncHandler = require("express-async-handler");
const { verifyTokenAndAdmin } = require("../middlewars/verifyToken");
/**
 * @route GET /books
 * @desc Get all books
 * @access Public
 */

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { minPrice, maxPrice } = req.query;
    let books;
    if (minPrice && maxPrice) {
      books = await Book.find({
        price: { $gte: minPrice, $lte: maxPrice },
      }).populate("author", ["_id", "name"]);
    } else {
      books = await Book.find().populate("author", ["_id", "name"]);
    }
    res.status(200).json(books);
  }),
);

/**
 * @route GET /books/:id
 * @desc Get a book by ID
 * @access Public
 */

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate("author", [
      "_id",
      "name",
    ]);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  }),
);

/**
 * @route POST /books
 * @desc Create a new book
 * @access Public
 */
router.post(
  "/",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validateBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      price: req.body.price,
      cover: req.body.cover,
    });
    const result = await newBook.save();
    res.status(201).json(result);
  }),
);
/*
 * @route PUT /books/:id
 * @desc Update a book by ID
 * @access Public
 */

router.put(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validateUpdateBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true, runValidators: true },
    );
    if (updatedBook) {
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ message: "Book was not found" });
    }
  }),
);

/*
 * @route PUT /books/:id
 * @desc Update a book by ID
 * @access Public
 */

router.delete(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Book deleted successfull" });
    } else {
      res.status(404).json({ message: "Book was not found" });
    }
  }),
);

module.exports = router;
