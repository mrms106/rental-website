const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controllers/user.js");
const forgototpverify=require("../controllers/forgototpverify.js");


router.get("/signup",userController.renderSignupform)

router.post("/signup",wrapAsync(userController.signup));

router.get("/login",userController.renderLoginform);

router.post("/login",
saveRedirectUrl,
passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),
userController.login
);

router.get("/logout",userController.logout)



//forgot otp routes


router.get("/login/forgotpass", forgototpverify.enteremail);

  
  router.post('/login/forgotpass', forgototpverify.sendotp);
  // OTP verification page
  router.get('/login/forgotpass/otpverify', forgototpverify.enterotp);
  router.post('/login/forgotpass/otpverify', forgototpverify.verifyotp);
  router.get("/login/forgotpass/otpverify/updatepass",forgototpverify.changepass);
//update password
router.post('/update-password', forgototpverify.update);



module.exports=router;