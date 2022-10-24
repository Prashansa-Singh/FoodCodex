const { User } = require('../models/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const getDisplayName = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.body.userId })
		return res.send(JSON.stringify({ "displayName": user.displayName }));
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
		return res.send(JSON.stringify({ "displayName": user.displayName }));
	} catch (err) {
		return next(err);
	}
}


const validateUser = async (req, res, next) => {
	try {
		// console.log(
		// 	`Received the following username: ${req.body.username} and password: ${req.body.password}`
		// );

		let rawUser = await User.findOne({
			userName: req.body.username,
		});

		if (!rawUser) {
			return res.send(null);
		}

		rawUser = rawUser.toObject()

		const { password, restaurants, ...fetchUser } = rawUser;

		const check_password = bcrypt.compareSync(req.body.password, password);
		if (check_password) {
			return res.send(JSON.stringify(fetchUser));
		} else {
			return res.send(null);
		}

	} catch (err) {
		return next(err);
	}
};


module.exports = {
	validateUser,
	getDisplayName,
	updateDisplayName
}