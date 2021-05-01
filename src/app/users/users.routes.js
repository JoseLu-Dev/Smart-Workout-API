const router = require('express').Router()

const UsersController = require('./users.controller')

const usersController = new UsersController()

// Users
// TODO: ensure this is what I need
router.route('').post(usersController.insert)
router.route('').get(usersController.getAll);
router.route('/count').get(usersController.count)
router.route('/:id').get(usersController.get)
router.route('/:id').put(usersController.update)
router.route('/:id').delete(usersController.delete)

module.exports = router
