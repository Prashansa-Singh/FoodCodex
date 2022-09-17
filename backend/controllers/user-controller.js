// temp
const path = require('path');

const {User} = require('../models/user')


const getSignup = async (req, res) => {
    // render it later, now just send html file
    res.sendFile(path.join(__dirname+'/../views/signup.html'));
}

const createUser = async (req, res, next) => {
    try {
        // visualise
        const body = JSON.parse(Object.keys(req.body))
        const user = new User(body)
        console.log(user)

        //await user.save()
        console.log(res.body);
        return res.send(user);
    }
    catch (err) {
        return next(err)
    }
}


module.exports = {
    getSignup,
    createUser
}