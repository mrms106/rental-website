const Listing=require("../models/listing");
const Booking=require("../models/booking");
const User=require("../models/user.js");


module.exports.index=async(req,res)=>{
    const allListing=await  Listing.find({});   
 res.render("./listings/index.ejs",{allListing});
   
};

module.exports.rendernewform=(req,res)=>{
    res.render("./listings/new.ejs")
};

module.exports.showListing=async(req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id)
    .populate({
    path:"reviews",
    populate:{
        path:"author", 
    },})
    .populate("owner");
    if(!listing){
        req.flash("error","listing you requestd for does not exist ");
        res.redirect("/listing")
    }
    // console.log(listing)
    res.render("./listings/show.ejs",{listing});
    

};
module.exports.wishlist=async(req,res)=>{
    try {
      const listingId = req.params.id;
      const { email } = req.body.listing;
  
      // Find the listing by ID and update its wishlist with the provided email
      const listing = await Listing.findByIdAndUpdate(listingId, { $addToSet: { wishlist: `${email}wishlist` } }, { new: true });
  
      if (!listing) {
        return res.status(404).send('Listing not found');
      }
  
      return res.status(200).send('Listing added to wishlist successfully');
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }
  };

module.exports.createListing=async(req,res,next)=>{
   let url= req.file.path;
   let filename=req.file.filename;
    const newListing= new Listing(req.body.listing);
    newListing.owner= req.user._id;
    newListing.image={url,filename}
    await newListing.save();
    req.flash("success","new listing created!!");
    res.redirect("/listing");
        // let{title,description,image,price,country,location}=req.body;
 
 
    
 };

 module.exports.renderEditform=async(req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id).populate(owner);
    if(!listing){
        req.flash("error","listing you requestd for does not exist ");
        res.redirect("/listing")
    }
//    let originalImage= listing.image.url;
//  originalImage= originalImage.replace("/upload","/upload/w_250");
    res.render("./listings/edit.ejs",{listing})

};

module.exports.updateListing=async(req,res)=>{
  let{id}=req.params;
  let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});
  if(typeof req.file !=="undefined"){
  let url= req.file.path;
  let filename=req.file.filename;
  listing.image={url,filename};
  await listing.save();
  }
   req.flash("success"," listing Updated!!");
   res.redirect(`/listing/${id}`);
};

module.exports.destroyListing=async(req,res)=>{
    let{id}=req.params;
  let deletedLIsting=  await Listing.findByIdAndDelete(id);
  req.flash("success"," listing Deleted!!");
  res.redirect("/listing");

};





//this module for search query
module.exports.searchquary=async (req, res) => {
    
    const query = req.query.query; 
    
    try{
        const allListing = await Listing.find({
            $or: [
                { title: { $regex: query, $options: 'i' } }, // Case-insensitive search for title
                { description: { $regex: query, $options: 'i' } }, // Case-insensitive search for description
                { country: { $regex: query, $options: 'i' } },
                { location: { $regex: query, $options: 'i' } },
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

