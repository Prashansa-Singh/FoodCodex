const { User } = require('../models/user');


// temp
const path = require('path');
const getSignup = async (req, res) => {
    // render it later, now just send html file
    res.sendFile(path.join(__dirname + '/../views/signup.html'));
};


const createUser = async (req, res, next) => {
    try {
        //const user = new User(req.body);

        // visualise
        //console.log(req.body);
        //console.log(user);
        const body = JSON.parse(Object.keys(req.body))
        //console.log(body);
        const user = new User(body)
        //console.log(user)

        //await user.save()

        return res;
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
    getSignup,
    createUser,
    deleteUser
};
