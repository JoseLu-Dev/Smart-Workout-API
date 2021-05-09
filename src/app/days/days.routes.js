const router = require('express').Router()

const DaysController = require('./days.controller')

const daysController = new DaysController()

// Days
/**
 * Two, Three parameters for same route
*/
router.route('/:year/:month/:day').get(daysController.getSingleDay);
router.route('/:year/:month').get(daysController.getByYearAndMonth);

module.exports = router
