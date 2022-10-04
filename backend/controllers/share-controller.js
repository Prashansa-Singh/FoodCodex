const { User } = require('../models/user');
const { Restaurant } = require('../models/restaurant');
const { Link } = require('../models/link');


/**
 * Generate a public link to share a restaurant
 * Returns: linkId, a string
 * cat ~/user/restaurant/share/public/{returned linkId}
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
 * View a shared restaurant via opening the link
 * open ~/user/restaurant/share/public/linkId
 * Returns: restaurantId, a newly created temporary restaurant record
 */
const viewSharedRestaurant = async (req, res, next) => {
    try {
        const link = await Link.findById(req.params.linkId)
        const record = await Restaurant.findById(link.restaurantId)
        let restaurant = new Restaurant()

        if (link['shareName'] === true) restaurant.name = record.name;
        if (link['shareRating'] === true) restaurant.rating = record.rating;
        if (link['sharePriceRating'] === true) restaurant.priceRating = record.priceRating;
        if (link['shareCuisine'] === true) restaurant.cuisine = record.cuisine;
        if (link['shareAddress'] === true) restaurant.address = record.address;
        if (link['shareOptions'] === true) {
            restaurant.personalOption = false
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

        console.log(restaurant)
        await restaurant.save()
        res.send(restaurant._id)
    }
    catch (err) {
        return next (err)
    }
}


const shareRestaurant = async (req, res, next) => {

}

const shareAllRestaurants = async (req, res, next) => {

}


module.exports = {
    getAllSharedRestaurants,

    generateRestaurantShareLink,
    viewSharedRestaurant,

    shareRestaurant,
    shareAllRestaurants
}
