const express = require("express");
const router = express.Router();
const libararianAuthController = require("../../controllers/librarian/authentication");

router.post("/sign-up",libararianAuthController.signUp);

router.post('/login',libararianAuthController.login)

module.exports=router