const express = require('express')
const cors = require('cors')

const restaurantRouter = express.Router()
const restaurantController = require('../controllers/restaurant-controller')

restaurantController.use(cors())


const experienceRouter = require('../routes/experience-router')
restaurantRouter.use('/experience', experienceRouter)
// app.use('/experience', experienceRouter)


const shareRouter = require('../routes/share-router')
restaurantRouter.use('/share', shareRouter)

restaurantRouter.options('/create-one', cors());
restaurantRouter.options('/update-one', cors());


restaurantRouter.get('/view-all', restaurantController.getAllRestaurants)
restaurantRouter.get('/view-one', restaurantController.getRestaurant)

restaurantRouter.post('/create-one', cors(), restaurantController.createRestaurant)
restaurantRouter.post('/update-one', cors(), restaurantController.updateRestaurant)

restaurantRouter.delete('/delete-one', restaurantController.deleteRestaurant)
restaurantRouter.delete('/delete-all', restaurantController.deleteAllRestaurants)


module.exports = restaurantRouter;