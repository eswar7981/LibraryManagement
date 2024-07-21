const express = require("express");
const router = express.Router();
const userAuthenticationController = require("../../controllers/user/authentication");

router.post("/sign-up", userAuthenticationController.signUp);

router.post('/login',userAuthenticationController.login)

module.exports=router