const joi=require("joi");

module.exports.listingSchema=joi.object({
    listing:joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        location:joi.string().required(),
        country:joi.string().required(),
        price:joi.number().required().min(0),
        image:joi.object().allow("",null),
        catagory:joi.string().allow("",null),
        email:joi.string().allow("",null),
        wishlist: joi.array().items(joi.string()) // Define wishlist as an array of strings
    

    }).required()
});

module.exports.reviewSchema=joi.object({
    review:joi.object({
        rating:joi.number().required().min(1).max(5),
        comment:joi.string().required()
    }).required()
})