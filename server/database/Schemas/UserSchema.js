const mongoose = require("mongoose");


const BorrowedBookSchema =new mongoose.Schema({
  bookId: {
    type: mongoose.SchemaTypes.ObjectId,
  },
  borrowedDate: {
    type: mongoose.SchemaTypes.Date,
  },
  dueDate: {
    type: mongoose.SchemaTypes.Date,
  },
});

const User =new  mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    maxLength: 40,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  borrowedBooks: [BorrowedBookSchema],
});

module.exports= mongoose.model("User", User);
