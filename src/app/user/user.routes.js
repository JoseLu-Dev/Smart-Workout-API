const router = require('express').Router()

const UserController = require('../user/user.controller')
const userController = new UserController()

// Users
//TODO: ensure this is what I need
router.route('').post(userController.insert)
router.route('').get(userController.getAll);
router.route('/count').get(userController.count)
router.route('/:id').get(userController.get)
router.route('/:id').put(userController.update)
router.route('/:id').delete(userController.delete)

module.exports = router