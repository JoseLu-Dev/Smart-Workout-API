const router = require('express').Router()

const DaysController = require('./days.controller')

const daysController = new DaysController()

// Days
/**
 * Two parameters for same route
 */
router.route('/:year/:month').get(daysController.getAll);

module.exports = router
