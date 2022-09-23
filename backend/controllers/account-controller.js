const { User } = require('../models/user');


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

const deleteUser = async  (req, res, next) => {
    try {

    }
    catch (err) {
        return next(err);
    }
}


module.exports = {
    signupUser,
    deleteUser
};
