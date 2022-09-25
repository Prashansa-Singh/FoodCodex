const express = require('express')
const cors = require('cors')

const restaurantRouter = express.Router()
const restaurantController = require('../controllers/restaurant-controller')

restaurantRouter.use(cors())


const experienceRouter = require('../routes/experience-router')
restaurantRouter.use('/experience', experienceRouter)
// app.use('/experience', experienceRouter)


const shareRouter = require('../routes/share-router')
restaurantRouter.use('/share', shareRouter)


restaurantRouter.get('/view-all', restaurantController.getAllRestaurants)
restaurantRouter.get('/view-one', restaurantController.getRestaurant)

restaurantRouter.post('/create-one', restaurantController.createRestaurant)
restaurantRouter.post('/update-one', restaurantController.updateRestaurant)

restaurantRouter.options('/delete-one', cors());
restaurantRouter.delete('/delete-one', cors(), restaurantController.deleteRestaurant)

restaurantRouter.options('/delete-all', cors());
restaurantRouter.delete('/delete-all', cors(), restaurantController.deleteAllRestaurants)


module.exports = restaurantRouter;
