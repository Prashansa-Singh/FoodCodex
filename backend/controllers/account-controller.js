const { User } = require('../models/user');
const { deleteAllRestaurantsInteract } = require('./restaurant-controller')

// 634cf23ec87beeb6a190ced1
const signupUser = async (req, res, next) => {
    try {
        const user = new User(req.body)
        await user.save()
        return res.sendStatus(201)
    }
    catch (err) {
        return next(err);
    }
};

const deleteUser = async (req, res, next) => {
    // delete all restaurants associated with the user
    // then delete the user account

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


module.exports = {
    signupUser,
    deleteUser
};
