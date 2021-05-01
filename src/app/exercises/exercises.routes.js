const router = require('express').Router()

const ExercisesController = require('./exercises.controller')

const exercisesController = new ExercisesController()

// Exercises
router.route('').get(exercisesController.getAll);
router.route('').put(exercisesController.put)

module.exports = router
