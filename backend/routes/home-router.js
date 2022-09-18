const express = require('express');

const homeRouter = express.Router();
const homeController = require('../controllers/home-controller')


homeRouter.get('/', homeController.status200);

homeRouter.get('/about', homeController.aboutUs);

homeRouter.get('/contact', homeController.contactUs);


module.exports = homeRouter;
