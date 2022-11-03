const express = require('express');
const cors = require('cors');

const userRouter = express.Router();
const userController = require('../controllers/user-controller');

userRouter.use(cors());

const restaurantRouter = require('../routes/restaurant-router')
userRouter.use('/restaurant', restaurantRouter);

const settingsRouter = require('../routes/settings-router')
userRouter.use('/settings', settingsRouter);


userRouter.post('/validate-user', userController.validateUser);

userRouter.get('/view-display-name', userController.getDisplayName);

userRouter.options('/update-display-name', cors());
userRouter.post('/update-display-name', cors(), userController.updateDisplayName);


module.exports = userRouter;