const express = require("express");
const router = express.Router();
const userOthers = require("../../controllers/user/others");
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

router.post("/borrow-book", userOthers.borrowBook);

router.get("/borrow-book", userOthers.getBorrowedBooks);

router.patch("/extend-due", userOthers.extendDue);

router.delete("/return-book", userOthers.returnBook);

module.exports = router;
