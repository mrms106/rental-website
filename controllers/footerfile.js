
module.exports.privacy=(req,res)=>{
    res.render("./footerejs/privacy.ejs");
    
}

module.exports.contactus=(req,res)=>{
    res.render("./footerejs/contactus.ejs");
    
}

const{contactusmail}=require("../nodemail/contactus")

module.exports.contactuspost= async(req,res)=>{
    const form = req.body.contact;
    try {
        
        contactusmail(form)
        req.flash("success", "your message has sent, Thank you!");
        res.redirect(`/listing`);
    } catch (err) {
        console.log(err)
        req.flash("error", "An error occurred while processing your message. Please try again later.");
        res.redirect(`/listing`);
    }
    };
