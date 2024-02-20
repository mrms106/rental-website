const express=require("express");
const router=express.Router();
const Userotp=require("../models/otp.js")
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const otpcontroller=require("../controllers/otpverify.js");


// const {generateOTP,sendOTP}=require("../models/nodemailerotp.js")


router.get("/", otpcontroller.enteremail);
  
  
  router.post('/signup', otpcontroller.sendotp);
  // OTP verification page
  router.get('/otpverify', otpcontroller.enterotp); 
  
  
  
  // OTP verification endpoint
  router.post('/verify-otp', otpcontroller.verifyotp);
  /// OTP page
  router.get('/otpverify/otp', otpcontroller.createacc);
  
  module.exports=router;