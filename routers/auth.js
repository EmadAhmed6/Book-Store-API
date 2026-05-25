const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Joi = require("joi");
const { mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const {
  validateRegisterUser,
  User,
  validateLoginUser,
} = require("../model/User");
/**
 * @route /auth/register
 * @desc Register New User
 * @method POST
 * @access public
 */

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { error } = validateRegisterUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ message: "This user already have an account" });
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    let newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const result = await newUser.save();
    const token = result.generateToken();

    const { password, ...others } = result._doc;
    res.status(200).json({ ...others, token });
  }),
);
/**
 * @route /auth/login
 * @desc Login New User
 * @method POST
 * @access public
 */

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { error } = validateLoginUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordMatch = bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = user.generateToken();
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, token });
  }),
);

module.exports = router;
