const mongoose = require('mongoose')


const linkSchema = new mongoose.Schema({
    senderId: {type: mongoose.Types.ObjectId},
    // receiverId: {type: mongoose.Types.ObjectId},

    restaurantId: {type: mongoose.Types.ObjectId},

    shareName: {type: Boolean, default: true},
    shareRating: {type: Boolean, default: true},
    sharePriceRating: {type: Boolean, default: true},
    shareCuisine: {type: Boolean, default: true},
    shareAddress: {type: Boolean, default: true},
    shareOptionTags: {type: Boolean, default: false}
})


const Link = mongoose.model('Link', linkSchema)

module.exports = {
    Link
}
