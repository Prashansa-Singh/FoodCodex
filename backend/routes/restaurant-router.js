const express = require('express')

const restaurantRouter = express.Router()
const restaurantController = require('../controllers/restaurant-controller')


const experienceRouter = require('../routes/experience-router')
restaurantRouter.use('/experience', experienceRouter)
// app.use('/experience', experienceRouter)


const shareRouter = require('../routes/share-router')
restaurantRouter.use('/share', shareRouter)



restaurantRouter.get('/:userId/view-all', restaurantController.getAllRestaurants)
restaurantRouter.get('/:userId/view-one', restaurantController.getRestaurant)

restaurantRouter.post('/:userId/create-one', restaurantController.createRestaurant)
restaurantRouter.post('/:userId/update-one', restaurantController.updateRestaurant)

restaurantRouter.delete('/:userId/delete-one', restaurantController.deleteRestaurant)
restaurantRouter.delete('/:userId/delete-all', restaurantController.deleteAllRestaurants)


module.exports = restaurantRouter;
