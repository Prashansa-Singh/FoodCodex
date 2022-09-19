const express = require('express');

const accountRouter = express.Router();
const accountController = require('../controllers/account-controller');

const cors = require('cors');
accountRouter.use(cors())

accountRouter.options('/signup', cors());


accountRouter.get('/', accountController.getSignup);

accountRouter.post('/signup', cors(), accountController.createUser);

accountRouter.delete('/delete', accountController.deleteUser);


module.exports = accountRouter;
