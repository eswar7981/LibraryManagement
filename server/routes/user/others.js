const express=require('express')
const router=express.Router()
const userOthers=require('../../controllers/user/others')
const jwt=require('jsonwebtoken')
require('dotenv').config()

router.use('/',(req,res)=>{
    const token=req.headers.token
    req.id=jwt.verify(token,process.env.SECRET_KEY).userId
})


