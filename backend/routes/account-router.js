const express = require('express');

const accountRouter = express.Router();
const accountController = require('../controllers/account-controller');


accountRouter.get('/', accountController.getSignup);

accountRouter.post('/signup', accountController.createUser);

accountRouter.delete('/delete', accountController.deleteUser);


module.exports = accountRouter;
