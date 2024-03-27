const {transporter}=require("../nodemail/nodemailer")

function contactusmail(form){
    const mailOptions = {
        from: process.env.mail, // Sender's email address
        to: process.env.mail2, // Receiver's email address (hotel owner)
        subject: 'New contact Us form from Wanderlust',
        text: `A new form from wanderlust:\nName: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`,  
          };
     transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error)
        }else{
            console.log("email sent" + info.response)
        }
     }); 
}
module.exports={contactusmail:contactusmail}