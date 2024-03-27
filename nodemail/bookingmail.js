const {transporter}=require("./nodemailer");

function  bookingmail(ownerEmail,newBooking){
    const mailOptions={
        from: process.env.mail, 
        to: ownerEmail, 
        subject: 'New Booking Notification From Wanderlust',
        text: `A new booking has been made for your listing. following is the details of customer:${newBooking}`,
    };
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }else{
            console.log('email sent:' + info.response);
        }
    });
}

function bookingmailuser(currUser,newBooking,ownerEmail){
    const mailOptions={
        from: process.env.mail, 
        to: currUser, 
        subject: 'Booking confirmation from wanderlust',
        text: `congratulation your booking is placed wait few minutes owner will contact you, 
        this is the email of owner ${ownerEmail} for any problem contact them and
         following are the information plese also recheack 
        ${newBooking}
        thank from wanderlust`,
    }
    transporter.sendMail(mailOptions, function(error,info){
        if(error){
            console.log(error)
        }else{
            console.log('email sent:' + info.response)
        }
    })
}







module.exports={bookingmail :bookingmail,
                 bookingmailuser:bookingmailuser };

