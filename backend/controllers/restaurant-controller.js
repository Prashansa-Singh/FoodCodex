const {User} = require('../models/user')
const {Restaurant} = require('../models/restaurant')

const getRestaurants = async (req, res) => {
    const user = await User.findOne(
        {_id: req.params.userId}).populate("restaurants");
    const restaurants = user['restaurants'];

    console.log(restaurants)
    return res.send(JSON.stringify(restaurants));
}

const createRestaurant = async(req, res, next) => {
    try {
        const restaurant = new Restaurant(req.body)
        await restaurant.save()
        await User.updateOne(
            {_id: req.params.userId},
            {$push: {restaurants: restaurant._id}}
        )

        console.log(restaurant)
        return res.send(`Done. ${restaurant.name} has been added.`)
    }
    catch (err) {
        return next(err)
    }
}


module.exports = {
    getRestaurants,
    createRestaurant
}
