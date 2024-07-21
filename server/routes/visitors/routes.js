const express = require("express");
const router = express.Router();
const otherController=require('../../controllers/visitors/controller')

router.get('/search',otherController.search)


module.exports=router

