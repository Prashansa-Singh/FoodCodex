// temp
const path = require('path');

const {User} = require('../models/user')
const {Restaurant} = require('../models/restaurant')

const getSignup = async (req, res) => {
    res.sendFile(path.join(__dirname+'/../views/signup.html'));
}

const createUser = async (req, res, next) => {
    try {
        // const user = new User(req.json.body)
        // await user.save()
        // res.json(req.body)
        return res.redirect('/')
    }
    catch (err) {
        return next(err)
    }
}


module.exports = {
    getSignup,
    createUser
}