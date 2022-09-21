const { User } = require('../models/user');
const { Restaurant } = require('../models/restaurant');

const getAllRestaurants = async (req, res) => {
	const user = await User.findOne({ _id: req.params.userId }).populate('restaurants');
	const restaurants = user['restaurants'];

	console.log(restaurants);
	return res.send(JSON.stringify(restaurants));
};

const createRestaurant = async (req, res, next) => {
	try {
		const restaurant = new Restaurant(req.body);
		await restaurant.save();
		await User.updateOne(
			{ _id: req.params.userId },
			{ $push: { restaurants: restaurant._id } }
		);

		console.log(restaurant);
		return res.send(`Done. ${restaurant.name} has been added.`);
	} catch (err) {
		return next(err);
	}
};

const getRestaurant = async (req, res) => {
	try {
		console.log(
			`Received the following restaurantId: ${req.body.restaurantId}`
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
	try {
		const userId = req.body.userId
		delete req.body.userId

		const restaurantId = req.body.restaurantId
		delete req.body.restaurantId		

		console.log(
			`Received the following userId: ${userId} and restaurantId: ${restaurantId}`
		);

		await Restaurant.updateOne(
			{_id: restaurantId},
			{$set: req.body}
		).lean()

		let restaurant = await Restaurant.findById(restaurantId)
		console.log(restaurant);
		return res.send(`Done.  userId: ${userId} with this restaurantId: ${restaurantId} record has been updated.`);
	} catch (err) {
		return next(err);
	}
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
