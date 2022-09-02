const {Restaurant} = require('../models/restaurant')

const getRestaurants = async (req, res) => {
    //
}

const createRestaurant = async(req, res, next) => {
    try {
        const restaurant = new Restaurant(req.body)

        console.log(req.body)
        console.log(restaurant)

        await restaurant.save()
        return res.redirect('/')
    }
    catch (err) {
        return next(err)
    }
}


module.exports = {
    getRestaurants,
    createRestaurant
}
