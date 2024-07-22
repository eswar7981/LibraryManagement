const Book = require("../../database/Schemas/Book");
const Librarian = require("../../database/Schemas/LibrarianSchema");
const mongoose = require("mongoose");

exports.addNewBook = async (req, res) => {
  const {
    title: title,
    category: category,
    author: author,
    copies: copies,
  } = req.body;

  try {
    const userId = new mongoose.mongo.ObjectId(req.id);

    const librarianDetails = await Librarian.findById({ _id: userId });

    const newBook = new Book({
      title: title,
      category: category,
      author: author,
      copies: parseInt(copies),
      librarianName: librarianDetails.name,
    });
    newBook.save();
    res.status(200).json({ status: "success" });
  } catch (e) {
    res.status(500).json({ status: "failed" });
  }
};

exports.editBook = async (req, res) => {
  const {
    title: title,
    category: category,
    author: author,
    copies: copies,
    bookId: bookId,
  } = req.body;

  try {
    const mongooseId = new mongoose.mongo.ObjectId(bookId);
    const updateBook = await Book.replaceOne(
      { _id: mongooseId },
      {
        title: title,
        author: author,
        category: category,
        copies: parseInt(copies),
      }
    );

    res.status(200).json({ status: "success" });
  } catch (e) {
    res.status(500).json({ status: "failed" });
  }
};

exports.deleteBook = async (req, res) => {
  const bookId = req.query.bookId;

  try {
    const deleteBook = await Book.findByIdAndDelete(bookId);

    res.status(200).json({ status: "success" });
  } catch {
    res.status(200).json({ status: "failed" });
  }
};
