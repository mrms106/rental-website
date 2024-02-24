const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");


const userSchema=new Schema({
    email:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true,
        unique:true,
    }
});

// // Add options object to configure Passport-Local-Mongoose
const options = {
    usernameField: 'email',// Define email as the username field for authentication
    usernameLowerCase: true, // Normalize emails to lowercase to ensure case-insensitive matching
    usernameQueryFields: ['username']
};

userSchema.plugin(passportLocalMongoose, options); // Apply Passport-Local-Mongoose plugin with options



// userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User", userSchema);