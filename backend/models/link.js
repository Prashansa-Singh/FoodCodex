const mongoose = require('mongoose')


const linkSchema = new mongoose.Schema({

    sender: {type: mongoose.Types.ObjectId},
    receiver: {type: mongoose.Types.ObjectId},

    shareName: {type: Boolean, default: true},
    shareRating: {type: Boolean, default: true},
    sharePriceRating: {type: Boolean, default: true},
    shareCuisine: {type: Boolean, default: true},
    shareOptions: {type: Boolean, default: true},
    shareAddress: {type: Boolean, default: false},
    shareExperiences: {type: Boolean, default: false}

})


const Link = mongoose.model('Link', linkSchema)

module.exports = {
    Link
}
