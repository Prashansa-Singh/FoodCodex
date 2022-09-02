const {User} = require('../models/user')
const {Restaurant} = require('../models/restaurant')

const getRestaurants = async (req, res) => {
    // not complete yet
    const restaurants = await User.findOne(
        {_id: req.params.userId}).populate("restaurants");
}

const createRestaurant = async(req, res, next) => {
    try {
        const restaurant = new Restaurant(req.body)
        await restaurant.save()
        await User.updateOne(
            {_id: req.params.userId},
            {$push: {restaurants: restaurant._id}}
        )

        console.log(req.body)
        console.log(restaurant)

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
