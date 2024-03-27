const nodemailer = require('nodemailer');
const randomstring = require('randomstring');



// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.mail, 
      pass: process.env.pass 
    }
  });
  
  // Generate OTP
  function generateOTP() {
    return randomstring.generate({
      length: 6,
      charset: 'numeric'
    });
  }
  
  // Send OTP via Email
  function sendOTP(email, otp) {
    const mailOptions = {
      from: process.env.mail,
      to: email,
      subject: 'OTP for Email Verification from Wanderlust',
      text: `Your OTP for email verification is: ${otp}`
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }



  module.exports = {
    generateOTP: generateOTP,
    sendOTP: sendOTP,
    transporter
    
    // Userotp: Userotp
};

