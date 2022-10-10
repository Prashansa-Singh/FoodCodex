const { Restaurant } = require('../models/restaurant');
const { Link } = require('../models/link');


/**
 * Generate a public link to share a restaurant
 * Returns: linkId, a string
 * cat `~/user/restaurant/share/public/${linkId}`
 */
const generateRestaurantShareLink = async (req, res, next) => {
    try {
        const link = new Link(req.body)
        await link.save()
        return res.send(link._id)
    }
    catch (err) {
        return next(err)
    }
}


/**
 * Helper function
 * Read out the restaurant from DB via provided linkId
 * Returns: a restaurant object
 */
const readSharedRestaurant = async (linkId) => {
    const link = await Link.findById(linkId)
    const record = await Restaurant.findById(link.restaurantId)

    let restaurant = {}
    restaurant.name = record.name;
    if (link['shareRating'] === true) restaurant.rating = record.rating;
    if (link['sharePriceRating'] === true) restaurant.priceRating = record.priceRating;
    if (link['shareCuisine'] === true) restaurant.cuisine = record.cuisine;
    if (link['shareAddress'] === true) restaurant.address = record.address;
    if (link['shareOptionTags'] === true) {
        restaurant.halalOption = record.halalOption
        restaurant.veganOption = record.veganOption
        restaurant.vegetarianOption = record.vegetarianOption
        restaurant.pescatarianOption = record.pescatarianOption
        restaurant.nutsFreeOption = record.nutsFreeOption
        restaurant.dairyFreeOption = record.dairyFreeOption
        restaurant.glutenFreeOption = record.glutenFreeOption
        restaurant.allergyFriendlyOption = record.allergyFriendlyOption
        restaurant.diabetesFriendlyOption = record.diabetesFriendlyOption
    }

    return restaurant;
}


/**
 * View a shared restaurant via opening the link
 * open `~/user/restaurant/share/public/${linkId}`
 * Returns: a JSON restaurant object with specified shared fields
 */
const viewSharedRestaurant = async (req, res, next) => {
    try {
        const restaurant = await readSharedRestaurant(req.params.linkId)
        return res.send(JSON.stringify(restaurant))
    }
    catch (err) {
        return next (err)
    }
}


module.exports = {
    generateRestaurantShareLink,
    viewSharedRestaurant,
}
