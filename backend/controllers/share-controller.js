const { User } = require('../models/user');
const { Restaurant } = require('../models/restaurant');
const { Link } = require('../models/link');


const getAllSharedRestaurants = (req, res) => {

}



const generateShareLink = async (req, res, next) => {
    try {
        const link = new Link(req.body)
        await link.save()
        return res.send(`/user/restaurant/share/public/${link._id}`)
    }
    catch(err) {
        return next(err)
    }
}

const shareRestaurant = async (req, res, next) => {

}

const shareAllRestaurants = async (req, res, next) => {

}


module.exports = {
    getAllSharedRestaurants,
    generateShareLink,
    shareRestaurant,
    shareAllRestaurants
}
