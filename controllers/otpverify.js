const Userotp=require("../models/otp.js")

const { generateOTP, sendOTP,  } = require('../nodemail/nodemailer.js');

module.exports.enteremail=async (req, res) => {
    res.render("./otp/signup.ejs")
  };

module.exports.sendotp=async (req, res) => {
    const { email } = req.body;
    const otp = generateOTP();
  
    try {
      // Check if user already exists
      let user = await Userotp.findOne({ email });
      if (user) {
        user.otp = otp;
      } else {
        user = new Userotp({ email, otp });
      }
  
      await user.save();
      sendOTP(email, otp); // Send OTP via email
      res.redirect(`/sign/otpverify?email=${email}`);
    } catch (err) {
      console.error(err);
      req.flash("error", "internal server error");
      return res.redirect(`/sign`);
    }
  }

module.exports.enterotp=(req, res) => {
    const email = req.query.email;
  
    if (!email) {
      // Redirect to signup if email is not provided
      return res.redirect('/');
    }
  
    res.render('./otp/otpverify.ejs', { email });
  }

module.exports.verifyotp=async (req, res) => {
    const { email, otp } = req.body;
    try {
      const user = await Userotp.findOne({ email });
  
      if (!user) {
        req.flash("error", "user is invalid");
        return res.redirect(`/sign`);
      }
  
      if (!otp || user.otp !== otp) {
        req.flash("error", "You entered an invalid OTP if you dont get otp go back and generate again");
        return res.redirect(`/sign/otpverify?email=${email}`);
        
      }
      // Clear OTP after successful verification
      user.otp = '';
      await user.save();
      // Redirect user to next page or send a success response
      res.redirect(`/sign/otpverify/otp?email=${email}`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }


module.exports.createacc=async(req, res) => {
    const email = req.query.email;
  
    try {
      const user = await Userotp.findOne({ email });
      if (!email) {
        // Redirect to signup if email is not provided
        return res.redirect('/sign');
      }
  
      if (!user) {
        // User not found, redirect to signup
        return res.redirect('/sign');
      }
      // User verified, render the OTP page
      res.render('./users/signup.ejs', { email });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }