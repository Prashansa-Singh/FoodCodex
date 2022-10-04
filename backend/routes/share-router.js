const express = require('express')

const shareRouter = express.Router()
const shareController = require('../controllers/share-controller')


shareRouter.post('/generate-link', shareController.generateRestaurantShareLink)
shareRouter.get('/public/:linkId', shareController.viewSharedRestaurant)


module.exports = shareRouter;
