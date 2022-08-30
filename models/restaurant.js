const mongoose = require('mongoose')


/* Experience Schema */
const experienceSchema = new mongoose.Schema({
    entryTime: {type: Date, required: true, unique: true},
    comment: {type: String},
    edited: {type: Boolean, default: false},
    editTime: {type: Date}
})


/* Restaurant Record Schema */
const restaurantSchema = new mongoose.Schema({
    name: {type: String, required: true},
    rating: {type: Number, enum: [0, 1, 2, 3, 4, 5]},
    priceRating: {type: String, enum: ['$', '$$', '$$$', '$$$$']},
    address: {type: String},
    experiences: {type: [mongoose.Types.ObjectId], ref: 'Experience', default: []},

    cuisine: {type: String},

    halalOption: {type: Boolean, default: false},
    veganOption: {type: Boolean, default: false},
    vegetarianOption: {type: Boolean, default: false},
    nutsFreeOption: {type: Boolean, default: false},
    dairyFreeOption: {type: Boolean, default: false},
    glutenFreeOption: {type: Boolean, default: false},
    diabetesFriendlyOption: {type: Boolean, default: false},
})


const Restaurant = mongoose.model('Restaurant', restaurantSchema)
const Experience = mongoose.model('Experience', experienceSchema)

module.exports = {
    Restaurant,
    Experience
}
