const mongoose = require("mongoose");

const borrowedBook = new mongoose.Schema({
  bookId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  borrowedDate: {
    type: mongoose.SchemaTypes.Date,
    required: true,
  },
  dueDate: {
    type: mongoose.SchemaTypes.Date,
    required: true,
  },
  returned: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("BorrowedBook", borrowedBook);
