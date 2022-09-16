const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/user-controller');

userRouter.get('/signup', userController.getSignup);

userRouter.post('/create', userController.createUser);

userRouter.post('/validateUser', userController.validateUser);

module.exports = userRouter;
