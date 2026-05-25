const express = require("express");
const Joi = require("joi");
const { default: mongoose } = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  age: {
    required: true,
    type: Number,
    min: 1,
    max: 100,
  },
  phoneNumber: {
    required: true,
    type: String,
    match: /^\d{10,15}$/,
  },
});
const validateCreateAuthor = (author) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(10).required(),
    email: Joi.string().email().required(),
    age: Joi.number().min(1).max(100).required(),
    phoneNumber: Joi.string().min(10).max(15).required(),
  });
  return schema.validate(author);
};
const validateUpdateAuthor = (author) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(10),
    email: Joi.string().email(),
    age: Joi.number().min(1).max(100),
    phoneNumber: Joi.string().min(10).max(15),
  });
  return schema.validate(author);
};

const Author = mongoose.model("Author", authorSchema);
module.exports = { Author, validateCreateAuthor, validateUpdateAuthor };
