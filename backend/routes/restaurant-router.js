const express = require('express')

const restaurantRouter = express.Router()
const restaurantController = require('../controllers/restaurant-controller')

restaurantRouter.get('/:userId/', restaurantController.getRestaurants)

restaurantRouter.post('/:userId/restaurants/create-restaurant', restaurantController.createRestaurant)


module.exports = restaurantRouter;
