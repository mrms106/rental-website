const { model } = require("mongoose");
const User=require("../models/user.js");

const Userotp=require("../models/otp.js")

const { generateOTP, sendOTP,  } = require('../nodemail/nodemailer.js');

module.exports.enteremail=async (req, res) => {
    res.render("./forgototp/emailenter.ejs")
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
      res.redirect(`/login/forgotpass/otpverify?email=${email}`);
    } catch (err) {
      console.error(err);
      req.flash("error", "internal server error");
      return res.redirect(`/login`);
    }
  }

module.exports.enterotp=(req, res) => {
    const email = req.query.email;
  
    if (!email) {
      // Redirect to signup if email is not provided
      return res.redirect('/');
    }
  
    res.render('./forgototp/forgotverifyemail.ejs', { email });
  }

module.exports.verifyotp=async (req, res) => {
    const { email, otp } = req.body;
    try {
      const user = await Userotp.findOne({ email });
  
      if (!user) {
        req.flash("error", "user is invalid");
        return res.redirect(`/login`);
      }
  
      if (!otp || user.otp !== otp) {
        req.flash("error", "You entered an invalid OTP if you dont get otp go back and generate again");
        return res.redirect(`/login/enteremail/otpverify?email=${email}`);
        
      }
      // Clear OTP after successful verification
      user.otp = '';
      await user.save();
      // Redirect user to next page or send a success response
      res.redirect(`/login/forgotpass/otpverify/updatepass?email=${email}`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }


module.exports.changepass=async(req, res) => {
    const email = req.query.email;
  
    try {
      const user = await Userotp.findOne({ email });
      if (!email) {
        // Redirect to signup if email is not provided
        return res.redirect('/login');
      }
  
      if (!user) {
        // User not found, redirect to signup
        return res.redirect('/login');
      }
      // User verified, render the OTP page
      res.render('./forgototp/update.ejs', { email });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }



//for updating password


module.exports.update=async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            req.flash('error', 'No user found with that email.');
            return res.redirect('/login/forgotpass'); // Redirect to forgot password page or wherever you want
        }

        // Set new password using setPassword method provided by passport-local-mongoose
        await user.setPassword(password);

        // Save the updated user
        await user.save();

        req.flash('success', 'Password updated successfully.');
        res.redirect('/login'); // Redirect to login page
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/forgot-password'); // Redirect to forgot password page or handle error appropriately
    }
}