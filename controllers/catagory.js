const Listing=require("../models/listing");
const user = require("../models/user.js");
const User=require("../models/user.js");


//this module for search query
module.exports.searchquary=async (req, res) => {
  
    const query = req.query.query; 
    const usernameQuery = req.query.username; // Username to search for

    try{
       
        const allListing = await Listing.find({
            $or: [
                { title: { $regex: query, $options: 'i' } }, // Case-insensitive search for title
                { description: { $regex: query, $options: 'i' } }, // Case-insensitive search for description
                { country: { $regex: query, $options: 'i' } },
                { location: { $regex: query, $options: 'i' } },
                { catagory: { $regex: query, $options: 'i' } },
                ],
                
            });
        
        if (allListing.length === 0) {
            req.flash("error","the destination you search does not found search correctely ");
            res.redirect("/listing");
        }else{
        res.render("./listings/search.ejs",{allListing})} 
           }  catch (error) {
            console.error('Error searching listings:', error);
            res.status(500).send('Internal Server Error');
        }    
}
//catagories route

module.exports.catagory=async(req,res)=>{
    {
    
        const query = req.query.query; 
        
        try{
            const allListing = await Listing.find({
                $or: [
                    { catagory: { $regex: query, $options: 'i' } },
                ]
            });
                
            
            if (allListing.length === 0) {
                req.flash("error","the destination you search does not found search correctely ");
                res.redirect("/listing");
            }else{
            res.render("./listings/search.ejs",{allListing})}
               }  catch (error) {
                console.error('Error searching listings:', error);
                res.status(500).send('Internal Server Error');
            }    
    }
}
module.exports.wishlist=async(req,res)=>{
    const currUser = req.user.username;
    const allListing = await Listing.find({ wishlist: currUser }); 
    res.render("./catagories/wishlist.ejs",{allListing});
  
}
