const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/user-controller');


const restaurantRouter = require('../routes/restaurant-router')
userRouter.use('/restaurant', restaurantRouter);

const settingsRouter = require('../routes/settings-router')
userRouter.use('/settings', settingsRouter);



userRouter.get('/login', userController.loginUser);
userRouter.get('/logout', userController.logoutUser);

userRouter.post('/validate-user', userController.validateUser);



module.exports = userRouter;
