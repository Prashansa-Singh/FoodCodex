const mongoose = require('mongoose')
const logger = require('../logger')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const mongooseClient = mongoose
    .connect(process.env.MONGO_URL || 'mongodb://localhost',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'FoodCodex'
        })
    .then((m) => m.connection.getClient())

const db = mongoose.connection.on('error', () => {
    logger.connectionLogger.log('error', 'Failed to connect to MongoDB');
    process.exit(1)
})

db.once('open', async() => {
    logger.connectionLogger.log('info', `Mongo connection started on ${db.host}:${db.port}`)
})

require('./user')
require('./restaurant')

module.exports = mongooseClient
