const { User } = require('../models/user');
const { Restaurant } = require('../models/restaurant');
const { Experience } = require('../models/restaurant');


const getAllExperiences = async (req, res) => {
	const restaurant = await Restaurant.findOne({ _id: req.body.restaurantId }).populate('experiences');
	const experiences = restaurant['experiences'];
	console.log(experiences);
	return res.send(JSON.stringify(experiences));
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
    try {
        const restaurantId = req.body.restaurantId
        console.log(`Received the following restaurantId: ${restaurantId}`);

        const experiences = req.body.updatedExperienceData
        const arrayLength = experiences.length
        
        // Loop through all experiences and update
		let i = 0
		for (i = 0; i < arrayLength; i++) {
            let experience = experiences[i]

            const experienceId = experience._id
            delete experience._id
            console.log(`Received the following experienceId: ${experienceId}`);

            await Experience.updateOne(
                {_id: experienceId},
                {$set: experience}
            ).lean()

            let updatedExperience = await Experience.findById(experienceId)
            console.log(updatedExperience)
		}
        return res.send(`Done.  Experiences of restaurantId: ${restaurantId} has been updated.`);
	} catch (err) {
		return next(err);
	}
}


const updateExperience = async (req, res, next) => {
    try {
        const restaurantId = req.body.restaurantId
		delete req.body.restaurantId

		const experienceId = req.body.experienceId
		delete req.body.experienceId

		console.log(`Received the following restaurantId: ${restaurantId} and experienceId: ${experienceId}`);

		await Experience.updateOne(
			{_id: experienceId},
			{$set: req.body}
		).lean()    
       
		let updatedExperience = await Experience.findById(experienceId)
		console.log(updatedExperience)
		
        return res.send(`Done.  The experienceId ${experienceId} of restaurantId: ${restaurantId} has been updated.`);
	} catch (err) {
		return next(err);
	}
}


const deleteExperience = async (req, res, next) => {
	try {
		const experienceId = req.body.experienceId
		const countBefore = await Experience.countDocuments({ _id: experienceId })
		await Experience.deleteOne({_id: experienceId})
		const countAfter = await Experience.countDocuments({ _id: experienceId })

		return res.send(`Number of documents with experienceId: ${experienceId} is [Before Deletion: ${countBefore}] and [After Deletion: ${countAfter}].`);

	} catch (err) {
		return next(err);
	}

}


const deleteAllExperiences = async (req, res, next) => {
	try {
		const restaurantId = req.body.restaurantId
		const restaurant = await Restaurant.findOne({ _id: restaurantId }).populate('experiences');
		const experiences = restaurant['experiences'];
		const arrayLength = experiences.length;

		// Loop through each of restaurant's experiences and delete
		let i = 0
		for (i = 0; i < arrayLength; i++) {
			const experienceId = experiences[i]._id		
			await Experience.deleteOne({_id: experienceId})
		}

		// Return number of restaurants before and after deletion for this user
		const countBefore = arrayLength
		const restaurantAfterDeletion = await Restaurant.findOne({ _id: restaurantId }).populate('experiences');
		const countAfter = restaurantAfterDeletion['experiences'].length
		return res.send(`Number of experiences for restaurantId: ${restaurantId} is [Before Deletion: ${countBefore}] and [After Deletion: ${countAfter}].`);
	} catch (err) {
		return next(err);
	}
}


module.exports = {
    getAllExperiences,
    createExperience,
    updateAllExperiences,
	updateExperience,
    deleteExperience,
    deleteAllExperiences
}
