const express = require("express");
const router = express.Router();
const { mongoose } = require("mongoose");
const { login, register } = require("../controllers/authController");

router.post("/register", register);

router.post("/login", login);

module.exports = router;
