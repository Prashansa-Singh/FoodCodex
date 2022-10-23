const { User } = require('../models/user');
const { Restaurant } = require('../models/restaurant');
const experienceController = require('../controllers/experience-controller');

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
		return res.send(restaurant._id);
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
			{ _id: restaurantId },
			{ $set: req.body }
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

		// Delete all experiences of the restaurant
		experienceController.deleteAllExperiencesInteract(restaurantId);

		// Delete the restaurant
		await Restaurant.deleteOne({ _id: restaurantId })
		const countAfter = await Restaurant.countDocuments({ _id: restaurantId })

		return res.send(`Number of documents with restaurantId: ${restaurantId} is [Before Deletion: ${countBefore}] and [After Deletion: ${countAfter}].`);

	} catch (err) {
		return next(err);
	}
}

const deleteAllRestaurantsInteract = async (req) => {
	try {
		const userId = req.body.userId
		const user = await User.findOne({ _id: userId }).populate('restaurants');
		const restaurants = user['restaurants'];
		const arrayLength = restaurants.length;

		// Loop through each of user's restaurant records and delete
		let i = 0
		for (i = 0; i < arrayLength; i++) {
			const restaurantId = restaurants[i]._id

			// Delete all experiences of the restaurant
			experienceController.deleteAllExperiencesInteract(restaurantId);

			// Delete the restaurant
			await Restaurant.deleteOne({ _id: restaurantId })
		}

		await User.updateOne(
			{ _id: userId },
			{ $set: { restaurants: [] } }
		);

		return arrayLength
	}
	catch (err) {
		console.error(err);
	}
}


const deleteAllRestaurants = async (req, res, next) => {
	try {
		const userId = req.body.userId
		const arrayLength = await deleteAllRestaurantsInteract(req)

		// Return number of restaurants before and after deletion for this user
		const countBefore = arrayLength
		const userAfterDeletion = await User.findOne({ _id: userId }).populate('restaurants');
		const countAfter = userAfterDeletion['restaurants'].length
		return res.send(`Number of restaurants for userId: ${userId} is [Before Deletion: ${countBefore}] and [After Deletion: ${countAfter}].`);
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
	deleteAllRestaurants,
	deleteAllRestaurantsInteract,
}