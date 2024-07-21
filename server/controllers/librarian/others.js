const Book = require("../../database/Schemas/Book");
const Librarian = require("../../database/Schemas/LibrarianSchema");
const mongoose=require('mongoose')

exports.addNewBook = async (req, res) => {
  const {
    title: title,
    category: category,
    author: author,
    copies: copies,
  } = req.body;

  try {
    const librarianDetails = await Librarian.findOne({ _id: req.id });
    const newBook = new Book({
      title: title,
      category: category,
      author: author,
      copies: parseInt(copies),
      librarianName: librarianDetails.name,
    });

    newBook.save();
  } catch (e) {
    console.log(e.message);
  }
};

exports.editBook = async(req, res) => {
  const {
    title: title,
    category: category,
    author: author,
    copies: copies,
    id:id
  } = req.body;

  try {
    const mongooseId=new mongoose.mongo.ObjectId(id)
    const updateBook=await Book.replaceOne({_id:mongooseId},{title:title,author:author,category:category,copies:parseInt(copies)})

  
    res.status(200).json({status:'success'})

  } catch (e){
    console.log(e.message)
    res.status(400).json({ status: "failed" });
  }
};
