const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const { notFound, errorHandler } = require("./middlewares/errors");
const { connectToDB } = require("./config/db");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectToDB();
app.set("view engine", "ejs");

app.use("/books", require("./routers/books"));
app.use("/auth", require("./routers/auth"));
app.use("/authors", require("./routers/authors"));
app.use("/users", require("./routers/users"));
app.use("/password", require("./routers/password"));

// Error handler middlware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`),
);
