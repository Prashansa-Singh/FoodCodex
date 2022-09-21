const express = require('express');

const homeRouter = express.Router();
const homeController = require('../controllers/home-controller')


homeRouter.get('/about', homeController.aboutUs);

homeRouter.get('/contact', homeController.contactUs);

homeRouter.get('/', homeController.OK200);

homeRouter.get('*', homeController.NotFound404);


module.exports = homeRouter;
