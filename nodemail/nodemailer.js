const nodemailer = require('nodemailer');
const randomstring = require('randomstring');



// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'mr.ms93679@gmail.com', // Enter your email address
      pass: 'vsqf cwao xvis yscg' // Enter your email password (or use app password)
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
      from: 'mr.ms93679@gmail.com',
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

module.exports=transporter

  module.exports = {
    generateOTP: generateOTP,
    sendOTP: sendOTP,
    
    // Userotp: Userotp
};

