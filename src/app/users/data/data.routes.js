const router = require('express').Router()

const UsersController = require('./data.controller')

const usersController = new UsersController()

router.route('').get(usersController.getByUserId)
router.route('/weight').put(usersController.putUserWeight)
router.route('/weight').get(usersController.getUserWeight)

module.exports = router
