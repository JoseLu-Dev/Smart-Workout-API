const router = require('express').Router()

const BandsController = require('./bands.controller')

const bandsController = new BandsController()

// Users
router.route('').put(bandsController.put)
router.route('').get(bandsController.getAllOfUser)

module.exports = router
