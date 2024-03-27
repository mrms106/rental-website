const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb+srv://mr-ms:OCkohODeYiNMtG8t@cluster0.fgcsj7b.mongodb.net/?retryWrites=true&w=majority";

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
  initData.data=initData.data.map((obj)=>({...obj,owner:"65e049a834c62aa6ff7b022f"}));
  // makar
  await Listing.insertMany(initData.data);
  
  console.log("data was initialized");
};
initDB();

