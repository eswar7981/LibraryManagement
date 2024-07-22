const Book = require("../../database/Schemas/Book");
const User = require("../../database/Schemas/UserSchema");
const BorrowedBook = require("../../database/Schemas/BorrowedBook");

const mongoose = require("mongoose");

function addDays(date, days) {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
}

exports.getBorrowedBooks = async (req, res) => {
  const borrowPeriod = req.body.borrowPeriod;
  const userId = new mongoose.mongo.ObjectId(req.id);

  try {
    const borrowedBooks = await BorrowedBook.find({ userId: userId });
    const borrowedBooksCompleteDetails = await Promise.all(
      borrowedBooks.map(async (book) => {
        const bookDetails = await Book.findOne({ _id: book.bookId });
        return { ...book.toObject(), ...bookDetails.toObject() };
      })
    );

    res
      .status(200)
      .json({ status: "success", books: borrowedBooksCompleteDetails });
  } catch (e) {
    res.status(200).json({ status: "failed" });
  }
};

exports.borrowBook = async (req, res) => {
  const borrowPeriod = req.body.borrowPeriod;
  const userId = new mongoose.mongo.ObjectId(req.id);

  try {
    const isThisBookAlreadyBorrowed = await BorrowedBook.find({
      userId: userId,
      bookId: req.body.bookId,
    });

    if (isThisBookAlreadyBorrowed.length > 0) {
      res
        .status(200)
        .json({ status: "failed", message: "book is already borrowed" });
    } else {
      const userDetails = await User.findOne({ _id: userId });
      const todayDate = new Date();
      const dueDate = addDays(todayDate, parseInt(borrowPeriod));

      const borrowedBook = new BorrowedBook({
        bookId: new mongoose.mongo.ObjectId(req.body.bookId),
        borrowedDate: todayDate,
        dueDate: dueDate,
        userId: userId,
      });
      borrowedBook.save();
      res.status(200).json({ status: "success" });
    }
  } catch (e) {
    res.status(500).json({ status: "failed" });
  }
};

exports.extendDue = async (req, res) => {
  const bookId = req.body.bookId;
  const userId = new mongoose.mongo.ObjectId(req.id);
  try {
    const book = await BorrowedBook.findOne({ bookId: bookId });

    const actualDueDate = book.dueDate;
    const newDueDate = addDays(actualDueDate, 30);

    await BorrowedBook.updateOne({ bookId: bookId }, { dueDate: newDueDate });
    res.status(200).json({ status: "success" });
  } catch (e) {
    res.status(500).json({ status: "failed" });
  }
};

exports.returnBook = async (req, res) => {
  const bookId = req.body.bookId;
  const userId = new mongoose.mongo.ObjectId(req.id);

  try {
    const book = await BorrowedBook.findOneAndUpdate(
      { bookId: bookId },
      { returned: true }
    );
    res.status(200).json({ status: "success" });
  } catch (e) {
    res.status(500).json({ status: "failed" });
  }
};
