const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// User schema
const userotpSchema = new Schema({
    email:String,
    otp: String
  });
  
  module.exports= mongoose.model('Userotp', userotpSchema);

  