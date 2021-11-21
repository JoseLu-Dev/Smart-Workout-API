const router = require('express').Router()

const DaysController = require('./days.controller')

const daysController = new DaysController()

// Days
/**
 * Two, Three parameters for same route
 */
router.route('/training-specs/:id').get(daysController.getTrainingSpecs)
router.route('/from-existing').put(daysController.createFromExisting);
router.route('/:year/:month/:day').get(daysController.getSingleDay);
router.route('/:year/:month').get(daysController.getByYearAndMonth);
router.route('').put(daysController.put)
router.route('/:id').patch(daysController.update)

module.exports = router
