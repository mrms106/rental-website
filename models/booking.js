const { number } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema= new Schema({
    username:String,
    hotel:String,
    name:String,
    phone:Number,
    mail:String,
    cheakIn:String,
    cheakOut:String,

});

module.exports=mongoose.model("book",bookingSchema);