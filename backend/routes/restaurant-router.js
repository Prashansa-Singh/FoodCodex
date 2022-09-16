const express = require('express')

const restaurantRouter = express.Router()
const restaurantController = require('../controllers/restaurant-controller')

restaurantRouter.get('/retrieve/:userId/', restaurantController.getRestaurants)

restaurantRouter.post('/retrieve/:userId/restaurants/create-restaurant', restaurantController.createRestaurant)

restaurantRouter.get('/getRestaurant', restaurantController.getRestaurant)

module.exports = restaurantRouter;
