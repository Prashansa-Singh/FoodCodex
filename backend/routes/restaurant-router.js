const express = require('express')

const restaurantRouter = express.Router()
const restaurantController = require('../controllers/restaurant-controller')

restaurantRouter.get('/restaurants', restaurantController.getRestaurants)

restaurantRouter.post('/restaurants/create-restaurant', restaurantController.createRestaurant)


module.exports = restaurantRouter;
