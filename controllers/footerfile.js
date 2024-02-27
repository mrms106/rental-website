module.exports.privacy=(req,res)=>{
    res.render("./footerejs/privacy.ejs");
    
}

module.exports.contactus=(req,res)=>{
    res.render("./footerejs/contactus.ejs");
    
}

const nodemailer = require("nodemailer");

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'mr.ms93679@gmail.com', // Enter your email address
        pass: 'vsqf cwao xvis yscg' // Enter your email password (or use app password)
    }
});


module.exports.contactuspost= async(req,res)=>{
    const form = req.body.contact;
    try {
        
        const mailOptions = {
            from: 'mr.ms93679@gmail.com', // Sender's email address
            to: 'mhs93679@gmail.com', // Receiver's email address (hotel owner)
            subject: 'New contact Us form from Wanderlust',
            text: `A new form from wanderlust:\nName: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`,        };
        await transporter.sendMail(mailOptions); 
        req.flash("success", "your message has sent, Thank you!");
        res.redirect(`/listing`);
    } catch (err) {
        console.log(err)
        req.flash("error", "An error occurred while processing your message. Please try again later.");
        res.redirect(`/listing`);
    }
    };
