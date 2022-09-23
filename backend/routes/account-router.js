const express = require('express');

const accountRouter = express.Router();
const accountController = require('../controllers/account-controller');

const cors = require('cors');
accountRouter.use(cors())
accountRouter.options('/signup', cors());


accountRouter.post('/signup', cors(), accountController.signupUser);

accountRouter.delete('/delete', cors(), accountController.deleteUser);


module.exports = accountRouter;
