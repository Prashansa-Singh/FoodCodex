const { User } = require('../models/user');

const loginUser = async (req, res) => {

}


const logoutUser = async (req, res) => {

}

const getDisplayName = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.body.userId })
		return res.send(JSON.stringify({"displayName": user.displayName}));
	} catch (err) {
		return next(err);
	}
};


const updateDisplayName = async (req, res, next) => {
	try {
		const userId = req.body.userId
		delete req.body.userId

		console.log(
			`Received the following userId: ${userId}`
		);

		await User.updateOne(
			{ _id: userId },
			{ $set: req.body }
		).lean()

		let user = await User.findById(userId)

		console.log(user);
		return res.send(JSON.stringify({"displayName": user.displayName}));
	} catch (err) {
		return next(err);
	}
}


const validateUser = async (req, res, next) => {
	try {
		console.log(
			`Received the following username: ${req.body.username} and password: ${req.body.password}`
		);

		let fetchUser = await User.findOne({
			userName: req.body.username,
		});

		console.log(fetchUser);

		if (!fetchUser) {
			return res.send(null);
		}

		// compare passwords => currently a plaintext check
		if (fetchUser.password === req.body.password) {
			return res.send(JSON.stringify(fetchUser));
		} else {
			return res.send(null);
		}
	} catch (err) {
		return next(err);
	}
};


module.exports = {
	loginUser,
	logoutUser,
	validateUser,
	getDisplayName,
	updateDisplayName
}