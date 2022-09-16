// temp
const path = require('path');

const { User } = require('../models/user');

const getSignup = async (req, res) => {
	// render it later, now just send html file
	res.sendFile(path.join(__dirname + '/../views/signup.html'));
};

const createUser = async (req, res, next) => {
	try {
		const user = new User(req.body);

		// visualise
		console.log(req.body);
		console.log(user);

		await user.save();
		return res.redirect('/user/signup');
	} catch (err) {
		return next(err);
	}
};

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
	getSignup,
	createUser,
	validateUser,
};
