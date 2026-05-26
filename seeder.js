const { Book } = require("./model/Book");
const { Author } = require("./model/Author");
const { books, authors } = require("./data");
const { connectToDB } = require("./config/db");
require("dotenv").config();

connectToDB();

const importBooks = async () => {
  try {
    await Book.insertMany(books);
    console.log("Books imported successfully");
  } catch (err) {
    console.error("Error importing books:", err);
    process.exit(1);
  }
};

const importAuthors = async () => {
  try {
    await Author.insertMany(authors);
    console.log("Authors imported successfully");
  } catch (err) {
    console.error("Error importing authors:", err);
    process.exit(1);
  }
};

const removeBooks = async () => {
  try {
    await Book.deleteMany();
    console.log("Books removed successfully");
  } catch (err) {
    console.error("Error removing books:", err);
    process.exit(1);
  }
};

if (process.argv[2] === "-import") {
  importBooks();
} else if (process.argv[2] === "-remove") {
  removeBooks();
} else if (process.argv[2] === "-import-authors") {
  importAuthors();
}
