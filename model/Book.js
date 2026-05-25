const Joi = require("joi");
const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 250,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Author",
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    cover: {
      type: String,
      required: true,
      enum: ["soft cover", "hard cover"],
    },
  },
  { timestamps: true },
);

const Book = mongoose.model("Book", bookSchema);
const validateBook = (book) => {
  const schema = Joi.object({
    title: Joi.string().required().min(3).max(250),
    author: Joi.string().required(),
    description: Joi.string().required().min(5),
    price: Joi.number().required().min(0),
    cover: Joi.string().valid("soft cover", "hard cover").required(),
  });
  return schema.validate(book);
};
const validateUpdateBook = (book) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(250),
    author: Joi.string(),
    description: Joi.string().min(5),
    price: Joi.number().min(0),
    cover: Joi.string().valid("soft cover", "hard cover"),
  });
  return schema.validate(book);
};
module.exports = {
  Book,
  validateBook,
  validateUpdateBook,
};
