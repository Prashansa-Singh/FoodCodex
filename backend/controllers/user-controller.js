const { User } = require('../models/user');

const loginUser = async (req, res) => {

}


const logoutUser = async (req, res) => {

}

const getDisplayName = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.body.userId })
		return res.send(JSON.stringify({ "displayName": user.displayName }));
	} catch (err) {
		return next(err);
	}
};


const validateUser = async (req, res, next) => {
	try {
		console.log(
			`Received the following username: ${req.body.username} and password: ${req.body.password}`
		);

		let rawUser = await User.findOne({
			userName: req.body.username,
		});

		if (!rawUser) {
			return res.send(null);
		}

		rawUser = rawUser.toObject()

		const { password, restaurants, ...fetchUser } = rawUser;

		// compare passwords => currently a plaintext check
		if (password === req.body.password) {
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
	getDisplayName
}