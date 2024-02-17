const Listing=require("./models/listing");
const Review = require("./models/review");
const expresserr=require("./utils/expresserr.js");
const {listingSchema,reviewSchema}=require("./schema.js");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
      // console.log(req);
      req.session.redirectUrl=req.originalUrl;
        req.flash("error","you Must be Logged in to  made an update in listing!");
        return res.redirect("/login");
      }
      next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl =req.session.redirectUrl;
  }
  next();
}

module.exports.isOwner=async(req,res,next)=>{
  let{id}=req.params;
  let listing=await Listing.findById(id);
  if(!listing.owner._id.equals(res.locals.currUser._id)){
      req.flash("error", "You Are Not The Owner Of This Listing ")
     return res.redirect(`/listing/${id}`)
  }
  next();
};

module.exports.validateListing=(req,res,next)=>{
    
    let {error}= listingSchema.validate(req.body);
    
    if(error){
     let errmsg=error.details.map((el)=>el.message).join(",");
     throw new expresserr(400,errmsg)
    }else{
     next();
    }
 };

 module.exports.validateReview=(req,res,next)=>{
    
  let {error}= reviewSchema.validate(req.body);
  
  if(error){
   let errmsg=error.details.map((el)=>el.message).join(",");
   throw new expresserr(400,errmsg)
  }else{
   next();
  }
};

module.exports.isReviewAuthor=async(req,res,next)=>{
  let{id,reviewId}=req.params;
  let review=await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)){
      req.flash("error", "You Are Not The Owner Of This review ")
     return res.redirect(`/listing/${id}`)
  }
  next();
}; 