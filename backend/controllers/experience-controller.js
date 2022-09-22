const { User } = require('../models/user');
const { Restaurant } = require('../models/restaurant');
const { Experience } = require('../models/restaurant');


const getAllExperiences = (req, res) => {

}


const createExperience = async (req, res, next) => {
	try {
		const restaurantId = req.body.restaurantId
		delete req.body.restaurantId

		const experience = new Experience(req.body);
		await experience.save();

		await Restaurant.updateOne(
			{ _id: restaurantId },
			{ $push: { experiences: experience._id } }
		);

		console.log(experience);
		return res.send(`Done. Experience Id:${experience._id} with Title: ${experience.title} has been added to this restaurantId: ${restaurantId}.`);
	} catch (err) {
		return next(err);
	}

}


const updateAllExperiences = async (req, res, next) => {

}


const deleteExperience = async (req, res, next) => {

}


const deleteAllExperience = async (req, res, next) => {

}


module.exports = {
    getAllExperiences,
    createExperience,
    updateAllExperiences,
    deleteExperience,
    deleteAllExperience
}
