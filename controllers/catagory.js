const Listing=require("../models/listing");


//catagories route

module.exports.arctic=async(req,res)=>{
    const allListing=await  Listing.find({catagory:"arctic"});
    res.render("./catagories/arctic.ejs",{allListing})
}
module.exports.boat=async(req,res)=>{
    const allListing=await  Listing.find({catagory:"Boat"});
    res.render("./catagories/boat.ejs",{allListing})
}
module.exports.camping=async(req,res)=>{
    const allListing=await  Listing.find({catagory:"camping"});
    res.render("./catagories/camping.ejs",{allListing})
}
module.exports.castele=async(req,res)=>{
    const allListing=await  Listing.find({catagory:"castele"});
    res.render("./catagories/castele.ejs",{allListing})
}
module.exports.city=async(req,res)=>{
    const allListing=await  Listing.find({catagory:"city"});
    res.render("./catagories/city.ejs",{allListing})
}
module.exports.domes=async(req,res)=>{
    const allListing=await  Listing.find({catagory:"domes"});
    res.render("./catagories/domes.ejs",{allListing})
}
module.exports.farm=async(req,res)=>{
    const allListing=await  Listing.find({catagory:"farm"});
    res.render("./catagories/farm.ejs",{allListing})
}
module.exports.mountain=async(req,res)=>{
    const allListing=await  Listing.find({catagory:"mountain"});
    res.render("./catagories/mountain.ejs",{allListing})
}
module.exports.pool=async(req,res)=>{
    const allListing=await  Listing.find({catagory:"pools"});
    res.render("./catagories/pool.ejs",{allListing})
}
module.exports.rooms=async(req,res)=>{
    const allListing=await  Listing.find({catagory:"rooms"});
    res.render("./catagories/rooms.ejs",{allListing})
}