const express = require('express')

const shareRouter = express.Router()
const shareController = require('../controllers/share-controller')

shareRouter.post('/generate-link', shareController.generateRestaurantShareLink)
shareRouter.get('/public/:linkId', shareController.viewSharedRestaurant)

shareRouter.get('/view-all', shareController.getAllSharedRestaurants)
shareRouter.post('/send-one', shareController.shareRestaurant)
shareRouter.post('/send-all', shareController.shareAllRestaurants)


module.exports = shareRouter;
