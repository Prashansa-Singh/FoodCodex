const express = require('express')

const experienceRouter = express.Router()
const experienceController = require('../controllers/experience-controller')

experienceRouter.get('/view-all', experienceController.getAllExperiences)
experienceRouter.get('/view-one', experienceController.getExperience)

experienceRouter.post('/create-one', experienceController.createExperience)
experienceRouter.post('/update-one', experienceController.updateExperience)

experienceRouter.delete('/delete-one', experienceController.deleteExperience)
experienceRouter.delete('/delete-all', experienceController.deleteAllExperience)


module.exports = experienceRouter;
