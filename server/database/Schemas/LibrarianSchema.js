const mongoose = require("mongoose");

const Librarian = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    maxLength: 40,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Librarian", Librarian);
