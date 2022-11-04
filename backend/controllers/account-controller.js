const { User } = require('../models/user');
const { deleteAllRestaurantsInteract } = require('./restaurant-controller')

const bcrypt = require('bcrypt');
const saltRounds = 10;

const signupUser = async (req, res, next) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, saltRounds);
        req.body.password = hash
        const user = new User(req.body)
        await user.save()
        return res.sendStatus(201)
    }
    catch (err) {
        return next(err);
    }
};


const deleteUser = async (req, res, next) => {
    try {
        // delete the users restaurants
        await deleteAllRestaurantsInteract(req);

        // delete user account
        await User.deleteOne({ _id: req.body.userId })
        return res.sendStatus(204)
    }
    catch (err) {
        return next(err);
    }
}


const isUsernameTaken = async (req, res, next) => {
    try {
        // return true if the username already exists, false otherwise
        return res.send(!!(await User.findOne({userName: req.body.userName})));
    }
    catch (err) {
        return next(err);
    }
}


module.exports = {
    signupUser,
    deleteUser,
    isUsernameTaken
};
