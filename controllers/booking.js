const Booking=require("../models/booking");
const Listing=require("../models/listing");
const nodemailer = require("nodemailer");
const {bookingmail,bookingmailuser}=require("../nodemail/bookingmail");




module.exports.booking=async(req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/book.ejs",{listing})
 };


module.exports.renderbookform=async(req,res)=>{
const newBooking = new Booking(req.body.booking);
const currUser=req.user.email;
let { id } = req.params;
try {
   
    const listing = await Listing.findById(id);
   
    const ownerEmail = listing.email; 
    bookingmail(ownerEmail,newBooking);
    bookingmailuser(currUser,newBooking,ownerEmail);
    await newBooking.save();
   
    req.flash("success", "Booked successfully! You will receive a message from the owner shortly. Make 50% payment to confirm booking. Thank you!");
    res.redirect(`/listing/${id}`);
} catch (err) {
    req.flash("error", "An error occurred while processing your booking. Please try again later.");
    res.redirect(`/listing/${id}`);
    console.log(err)
}
};