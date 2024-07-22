const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../../database/Schemas/UserSchema");

const generateToken = (id) => {
  return jwt.sign({ Id: id }, process.env.SECRET_KEY);
};

exports.signUp = async (req, res) => {
  const { name: name, email: email, password: password } = req.body;
  try {
    const user = await User.find({ email: email });

    if (user.length > 0) {
      res
        .status(200)
        .json({ status: "failed", message: "email is already registered" });
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        const newAccount = new User({
          name: name,
          email: email,
          password: hash,
        });
        newAccount.save();
        res.status(200).json({ status: "success" });
      });
    }
  } catch (e) {
    res.status(500).json({ status: "failed" });
  }
};

exports.login = async (req, res) => {
  const { email: email, password: password } = req.body;

  try {
    const user = await User.find({ email: email });
    if (user.length === 0) {
      res
        .status(200)
        .json({ status: "failed", message: "email does not exist" });
    } else {
      bcrypt.compare(password, user[0].password, (err, status) => {
        if (status === true) {
          const token = generateToken(user[0]._id);
          res.status(200).json({ status: "success", token: token });
        } else {
          res.status(200).json({ status: "failed", message: "wrong password" });
        }
      });
    }
  } catch (e) {
    res.status(500).json({ status: "failed" });
  }
};
