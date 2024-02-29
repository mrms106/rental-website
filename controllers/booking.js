const Booking=require("../models/booking");
const Listing=require("../models/listing");
const nodemailer = require("nodemailer");

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'mr.ms93679@gmail.com', // Enter your email address
        pass: 'vsqf cwao xvis yscg' // Enter your email password (or use app password)
    }
});



//booking routes
module.exports.booking=async(req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/book.ejs",{listing})
 };


module.exports.renderbookform=async(req,res)=>{
const newBooking = new Booking(req.body.booking);
let { id } = req.params;
try {
    // Get the details of the listing associated with the booking
    const listing = await Listing.findById(id);
    // Get the email of the hotel owner
    const ownerEmail = listing.email; 
    // Send email to the hotel owner
    const mailOptions = {
        from: 'mr.ms93679@gmail.com', // Sender's email address
        to: ownerEmail, // Receiver's email address (hotel owner)
        subject: 'New Booking Notification From Wanderlust',
        text: `A new booking has been made for your listing. following is the details of customer:${newBooking}`,
    };
    await transporter.sendMail(mailOptions); 
    // Save the new booking
    await newBooking.save();
    // Redirect with success message
    req.flash("success", "Booked successfully! You will receive a message from the owner shortly. Make 50% payment to confirm booking. Thank you!");
    res.redirect(`/listing/${id}`);
} catch (err) {
    req.flash("error", "An error occurred while processing your booking. Please try again later.");
    res.redirect(`/listing/${id}`);
    console.log(err)
}
};