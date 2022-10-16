const express = require('express')
const cors = require('cors')

const shareRouter = express.Router()
const shareController = require('../controllers/share-controller')

shareRouter.use(cors())
shareRouter.options('/generate-link', cors())

shareRouter.post('/generate-link', cors(), shareController.generateRestaurantShareLink)
shareRouter.get('/public/:linkId', shareController.viewSharedRestaurant)


module.exports = shareRouter;

