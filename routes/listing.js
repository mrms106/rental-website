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
const { assert } = require("joi");






//index route
router.get("/", wrapAsync(listingController.index));

// GET route to handle search submission
router.get('/search', (listingController.searchquary));


//catagories routes
router.get("/arctic",catagorycontroller.arctic);
router.get("/boat",catagorycontroller.boat);
router.get("/camping",catagorycontroller.camping);
router.get("/castele",catagorycontroller.castele);
router.get("/city",catagorycontroller.city);
router.get("/domes",catagorycontroller.domes);
router.get("/farm",catagorycontroller.farm);
router.get("/mountain",catagorycontroller.mountain);
router.get("/pool",catagorycontroller.pool);
router.get("/rooms",catagorycontroller.rooms);

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

router.get("/:id/booking",isLoggedIn,wrapAsync(listingController.booking));

router.post("/:id",isLoggedIn,wrapAsync(listingController.renderbookform));

router.get("/:id/booking/success",isLoggedIn,wrapAsync(listingController.booksuccess))



module.exports=router;