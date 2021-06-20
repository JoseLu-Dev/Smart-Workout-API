const router = require('express').Router()

const ExercisesController = require('./exercises.controller')

const exercisesController = new ExercisesController()

// Exercises
router.route('/:id').get(exercisesController.get)
router.route('/by-name/:search').get(exercisesController.getExercisesByName)
router.route('').get(exercisesController.getAllExercisesNames);
router.route('').put(exercisesController.put)

module.exports = router
