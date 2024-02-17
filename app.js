
//dotenv is package which accesse credentials from .env for upload image
if(process.env.NODE_ENV !="production"){
require('dotenv').config();

}


const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const expresserr=require("./utils/expresserr.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const cookieParser=require("cookie-parser");
const flash=require("connect-flash")
const passport=require("passport");
const localStratergy=require("passport-local");
const User=require("./models/user.js");



const listing = require("./routes/listing.js");
const reviews=require("./routes/review.js");
const user=require("./routes/user.js");




// const dbUrl="mongodb+srv://mr-ms:OCkohODeYiNMtG8t@cluster0.fgcsj7b.mongodb.net/?retryWrites=true&w=majority"
//adding the databas
const dbUrl=process.env.ATLAS_DB;
main()
.then(()=>{console.log("the database is connected")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);

}

app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});

store.on("error",()=>{
    console.log("Error in mongo session store",err);
});

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+ 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
};



// accessing the pages
app.get("/",async(req,res)=>{
   
    res.redirect("/listing");
 });

app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStratergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});


// app.get("/demouser",async(req,res)=>{
//     let fakeuser= new User({
//         email:"abc@gmail.com",
//         username:"mr-ms"

//     });
//  let registereduser=  await User.register(fakeuser,"hello")
//  res.send(registereduser)
// })



//accessing the routes from route folder
app.use("/listing",listing);
app.use("/listing/:id/reviews",reviews);
app.use("/",user);


//middlewair definig error handling
app.all("*",(req,res,next)=>{
    next(new expresserr(404,"page not found"));
});

app.use((err,req,res,next)=>{
    let{statuscode=500,message="something Went Wrong"}=err;
    res.status(statuscode).render("./listings/error.ejs",{message});
    // res.status(statuscode).send(message);

});



//port declaration
app.listen(8080,()=>{
    console.log("port is running");
});