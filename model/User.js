const express = require("express");
const Joi = require("joi");
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 200,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET_KEY,
  );
};
const validateRegisterUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().trim().min(5).max(100).required(),
    username: Joi.string().trim().min(2).max(200).required(),
    password: Joi.string().trim().min(7).required(),
  });
  return schema.validate(user);
};
const validateLoginUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().trim().min(5).max(100).required(),
    password: Joi.string().trim().min(7).required(),
  });
  return schema.validate(user);
};
const validateUpdateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().trim().min(5).max(100),
    username: Joi.string().trim().min(2).max(200),
    password: Joi.string().trim().min(7),
  });
  return schema.validate(user);
};

const User = mongoose.model("User", userSchema);
module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
};
