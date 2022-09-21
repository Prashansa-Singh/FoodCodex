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
	try {
		const restaurantId = req.body.restaurantId
		const countBefore = await Restaurant.countDocuments({ _id: restaurantId })
		await Restaurant.deleteOne({_id: restaurantId})
		const countAfter = await Restaurant.countDocuments({ _id: restaurantId })

		return res.send(`Number of documents with restaurantId: ${restaurantId} is [Before Deletion: ${countBefore}] and [After Deletion: ${countAfter}].`);

	} catch (err) {
		return next(err);
	}
}

const deleteAllRestaurants = async (res, next) => {
	try {
		const countBefore = await Restaurant.countDocuments({})
		await Restaurant.deleteMany({})
		const countAfter = await Restaurant.countDocuments({})

		return res.send(`Number of documents is [Before Deletion: ${countBefore}] and [After Deletion: ${countAfter}].`);

	} catch (err) {
		return next(err);
	}

}

module.exports = {
	getAllRestaurants,
    createRestaurant,
    getRestaurant,
	updateRestaurant,
	deleteRestaurant,
	deleteAllRestaurants
}
