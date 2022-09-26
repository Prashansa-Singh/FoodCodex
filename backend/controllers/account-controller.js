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

const deleteUser = async (req, res, next) => {
    try {
        await User.deleteOne({userName: req.body.userName})
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
