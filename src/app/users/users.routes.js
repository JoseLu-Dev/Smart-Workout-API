const router = require('express').Router()

const bandsRouter = require('./bands/bands.routes')
const dataRouter = require('./data/data.routes')

const UsersController = require('./users.controller')

const usersController = new UsersController()

router.use('/bands', bandsRouter)
router.use('/data', dataRouter)

// Users
router.route('').get(usersController.getUserData)

module.exports = router
