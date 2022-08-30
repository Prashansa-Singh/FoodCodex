const mongoose = require('mongoose')
require('./restaurant')

/* User properties */
const userSchema = new mongoose.Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},

    displayName: {type: String, required: true},
    darkMode: {type: Boolean, default: false},

    restaurants: {type: [mongoose.Schema.Type.ObjectId], ref: 'Restaurant', default: []},

    // secret: {type: String, required: true}  // for cookie
})

/* auth  */

/* ---- */

const User = mongoose.model('User', userSchema)

module.exports = {
    User
}
