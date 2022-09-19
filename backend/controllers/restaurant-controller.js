const { User } = require('../models/user');
const { Restaurant } = require('../models/restaurant');

const getAllRestaurants = async (req, res) => {
	const user = await User.findOne({ _id: req.body.userId }).populate('restaurants');
	const restaurants = user['restaurants'];

	console.log(restaurants);
	return res.send(JSON.stringify(restaurants));
};

const createRestaurant = async (req, res, next) => {
	try {
		const userId = req.body.userId
		delete req.body.userId
		const restaurant = new Restaurant(req.body);
		await restaurant.save();
		await User.updateOne(
			{ _id: userId },
			{ $push: { restaurants: restaurant._id } }
		);

		console.log(restaurant);
		return res.send(`Done. ${restaurant.name} has been added to this userId: ${userId}.`);
	} catch (err) {
		return next(err);
	}
};

const getRestaurant = async (req, res) => {
	try {
		console.log(
			`Received the following userId: ${req.body.userId} and restaurantId: ${req.body.restaurantId}`
		);

        let restaurant = await Restaurant.findById(req.body.restaurantId)

		console.log(restaurant);

        if (restaurant) {
            return res.send(JSON.stringify(restaurant));
        }
	} catch (err) {
		return next(err);
	}
}

const updateRestaurant = async (req, res, next) => {
}


const deleteRestaurant = async (req, res, next) => {
}


const deleteAllRestaurants = async (req, res, next) => {
}

module.exports = {
	getAllRestaurants,
    createRestaurant,
    getRestaurant,
	updateRestaurant,
	deleteRestaurant,
	deleteAllRestaurants
}
