const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
const { notFound, errorHandler } = require("./middlewares/errors");
const { connectToDB } = require("./config/db");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectToDB();

// Helemt
app.use(helmet());

// Cors Policy
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);
// View Engine
app.set("view engine", "ejs");

// Static Files
app.use(express.static(path.join(__dirname, "images")));

// Routes
app.use("/books", require("./routers/books"));
app.use("/auth", require("./routers/auth"));
app.use("/authors", require("./routers/authors"));
app.use("/users", require("./routers/users"));
app.use("/password", require("./routers/password"));
app.use("/upload", require("./routers/upload"));

// Error handler middlware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`),
);

