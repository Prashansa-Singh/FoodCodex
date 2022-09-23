const express = require('express')
const cors = require('cors')

const experienceRouter = express.Router()
const experienceController = require('../controllers/experience-controller')

experienceRouter.use(cors())

experienceRouter.get('/view-all', experienceController.getAllExperiences)

experienceRouter.options('/create-one', cors());

experienceRouter.post('/create-one', cors(), experienceController.createExperience)
experienceRouter.post('/update-all', experienceController.updateAllExperiences)

experienceRouter.delete('/delete-one', experienceController.deleteExperience)
experienceRouter.delete('/delete-all', experienceController.deleteAllExperiences)


module.exports = experienceRouter;
