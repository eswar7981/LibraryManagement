const mongoose = require("mongoose");

const BookSchema =new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  copies: {
    type: Number,
    required: true,
  },
  librarianName:{
    type:String,
    required:true
  }
});

module.exports=mongoose.model("Book", BookSchema);
