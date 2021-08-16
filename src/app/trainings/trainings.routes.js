const router = require('express').Router()

const TrainingsController = require('./trainings.controller')

const trainingsController = new TrainingsController()

router.route('/:id').patch(trainingsController.update)
router.route('/:id').get(trainingsController.get);
router.route('/:id').delete(trainingsController.delete);

module.exports = router
