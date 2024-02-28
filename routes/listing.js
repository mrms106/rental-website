const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js")

//for uploading image using multer package
const {storage}=require("../cloudConfig.js")
const multer  = require('multer')
const upload = multer({ storage })



const listingController=require("../controllers/listing.js");
const catagorycontroller=require("../controllers/catagory.js");
const bookingcontroller=require("../controllers/booking.js");
const footercontroller=require("../controllers/footerfile.js");


const { assert } = require("joi");






//index route
router.get("/", wrapAsync(listingController.index));

// GET route to handle search submission
router.get('/search', (catagorycontroller.searchquary));
//wishlist
router.get("/wishlist",isLoggedIn,catagorycontroller.wishlist);
//footer route
router.get("/privacy&terms", footercontroller.privacy)
router.get("/contactus", footercontroller.contactus)
router.post("/contactus",footercontroller.contactuspost)

//catagories routes
router.get("/catagory",catagorycontroller.catagory);

//new route
router.get("/new",isLoggedIn, (listingController.rendernewform));

//show route
router.get("/:id",wrapAsync(listingController.showListing));

//create route
router.post("/",isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing));

//edit route

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditform));

//update route
router.put("/:id",isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing));

//delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));


//booking routes

router.get("/:id/booking",isLoggedIn,wrapAsync(bookingcontroller.booking));
router.post("/:id",isLoggedIn,wrapAsync(bookingcontroller.renderbookform));
router.get("/:id/booking/success",isLoggedIn,wrapAsync(bookingcontroller.booksuccess))



// POST route to handle adding items to wishlist
router.post("/:id/add", listingController.addwishlist);
router.post("/:id/remove", listingController.removewishlist);






module.exports=router;