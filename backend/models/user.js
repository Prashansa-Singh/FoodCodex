const mongoose = require('mongoose')

/* User properties */
const userSchema = new mongoose.Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    displayName: {type: String, required: true},
    restaurants: {type: [mongoose.Types.ObjectId], ref: 'Restaurant', default: []},

    // secret: {type: String, required: true}  // for cookie
})

/* auth  */

/* ---- */

const User = mongoose.model('User', userSchema)

module.exports = {
    User
}
