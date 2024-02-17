const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust2";

main()
  .then(() => {
    console.log("connected to DB");
    // return initDB();
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}


const initDB = async () => {
  await Listing.deleteMany({});
  initData.data=initData.data.map((obj)=>({...obj,owner:"65cf80f4ef123381491c8579"}));
  await Listing.insertMany(initData.data);
  
  console.log("data was initialized");
};
initDB();

