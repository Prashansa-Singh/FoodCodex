const express = require('express')

const experienceRouter = express.Router()
const experienceController = require('../controllers/experience-controller')

experienceRouter.get('/view-all', experienceController.getAllExperiences)

experienceRouter.post('/create-one', experienceController.createExperience)
experienceRouter.post('/update-all', experienceController.updateAllExperiences)

experienceRouter.delete('/delete-one', experienceController.deleteExperience)
experienceRouter.delete('/delete-all', experienceController.deleteAllExperiences)


module.exports = experienceRouter;
