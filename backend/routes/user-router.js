const express = require('express')

const userRouter = express.Router();
const userController = require('../controllers/user-controller')


userRouter.get('/create', userController.createUser)



module.exports = userRouter
