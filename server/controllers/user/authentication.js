const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../../database/Schemas/UserSchema");

const generateToken = (id) => {
  return jwt.sign({ userId: id }, process.env.SECRET_KEY);
};

exports.signUp = async (req, res) => {
  const { name: name, email: email, password: password } = req.body;
  console.log(name, email, password);
  bcrypt.hash(password, 10, async (err, hash) => {
    const newAccount = new User({ name: name, email: email, password: hash });
    const task = await newAccount.save();
    console.log(task);
  });
};

exports.login = async (req, res) => {
  const { email: email, password: password } = req.body;

  
  try {

    const user = await User.findOne({ email: email });
    console.log(user)
    if (user === undefined) {
      res.status(404).json({ status: "user does not exist" });
    } else {
      bcrypt.compare(password, user.password, (err, status) => {
        if (status === true) {
          const token = generateToken(user._id);
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
