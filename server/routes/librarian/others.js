const express = require("express");
const router = express.Router();
const librarianController = require("../../controllers/librarian/others");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.use("/", (req, res, next) => {
  try {
    const token = req.headers.token;
 
    req.id = jwt.verify(token, process.env.SECRET_KEY).Id;
    next();
  } catch (e) {
    res.send(200).json({ status: "failed", message: e.message });
  }
});

router.post("/add-book", librarianController.addNewBook);

router.use("/edit-book", librarianController.editBook);

router.delete("/delete-book", librarianController.deleteBook);

module.exports = router;
