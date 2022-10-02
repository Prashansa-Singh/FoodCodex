const { User } = require('../models/user');
const { Restaurant } = require('../models/restaurant');
const { Link } = require('../models/link');


const getAllSharedRestaurants = (req, res) => {

}


const generateShareLink = async (req, res, next) => {
    try {
        const link = new Link(req.body)
        await link.save()
        // make dynamic
        return res.send(`/user/restaurant/share/public/${link._id}`)
    }
    catch (err) {
        return next(err)
    }
}


const getShareLink = async (req, res, next) => {
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

    generateShareLink,
    getShareLink,

    shareRestaurant,
    shareAllRestaurants
}
