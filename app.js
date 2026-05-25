const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
app.use(express.json());
const { notFound, errorHandler } = require("./middlewars/errors");
const { connectToDB } = require("./config/db");
connectToDB();
app.use("/books", require("./routers/books"));
app.use("/auth", require("./routers/auth"));
app.use("/authors", require("./routers/authors"));
app.use("/users", require("./routers/users"));

// Error handler middlware

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`),
);
