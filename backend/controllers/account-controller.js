const { User } = require('../models/user');


const createUser = async (req, res, next) => {
    try {
        //const user = new User(req.body);

        // visualise
        const user = new User(req.body)
        console.log(user)

        await user.save()

        return res.send(JSON.stringify(user));
    } catch (err) {
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
    createUser,
    deleteUser
};
