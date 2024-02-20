const User=require("../models/user.js");

module.exports.renderSignupform=(req,res)=>{
    res.render("users/signup.ejs");
 }

module.exports.signup=async(req,res)=>{
    try{
        let{username,email,password}=req.body;
        //cheack email is already resistered or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            req.flash("error", "Email is already registered use another email");
            return res.redirect("/sign");
        }

      const newUser=new User({email,username});
     const registereduser=await User.register(newUser,password);
//    console.log(registereduser);
       req.login(registereduser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "Welcome To Wanderlust!");
    res.redirect("/listing");
       })
   
 }catch(e){
         req.flash("error",e.message);
         res.redirect("/signup");
 }
    
};

module.exports.renderLoginform=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login=async(req,res)=>{
    req.flash("success","welcome back to wanderlust you are logged in");
    let redirectUrl=res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl);
};

module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
         return next(err)
        }
        req.flash("success","you are logged out!");
        res.redirect("/listing");
    })
};