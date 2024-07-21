const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const mongoose = require("mongoose");
const Librarian = require("../../database/Schemas/LibrarianSchema");

const generateToken = (id) => {
  return jwt.sign({ Id: id }, process.env.SECRET_KEY);
};

exports.signUp = async (req, res) => {
  const { name: name, email: email, password: password } = req.body;

  try {
    const librarian = await Librarian.findOne({ email: email });

    if (librarian) {
      res
        .status(400)
        .json({ status: "failed", message: "email is already registered" });
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        const newAccount = new Librarian({
          name: name,
          email: email,
          password: hash,
        });
        const task = await newAccount.save();
        console.log(task);
      });
    }
  } catch (e) {
    console.log(e.message);
  }
};

exports.login = async (req, res) => {
  const { email: email, password: password } = req.body;

  try {
    const librarian = await Librarian.findOne({ email: email });
    if (librarian === undefined) {
      res.status(404).json({ status: "user does not exist" });
    } else {
      bcrypt.compare(password, librarian.password, (err, status) => {
        if (status === true) {
          const token = generateToken(librarian._id);
         
          res.status(200).json({ status: "success", token: token });
        } else {
          res.status(400).json({ status: "wrong password" });
        }
      });
    }
  } catch (e) {
    console.log(e.message);
  }
};
