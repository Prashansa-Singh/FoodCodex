const express = require('express')

const settingsRouter = express.Router()
const settingsController = require('../controllers/settings-controller')

settingsRouter.get('/view', settingsController.getSettings);

settingsRouter.post('/update', settingsController.updateSettings);

settingsRouter.post('/delete-account', settingsController.deleteAccount);

module.exports = settingsRouter;
