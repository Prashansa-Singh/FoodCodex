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

userRouter.get('/view-display-name', userController.getDisplayName);

userRouter.post('/update-display-name', userController.updateDisplayName);


module.exports = userRouter;
