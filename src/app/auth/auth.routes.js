const router = require('express').Router()

const AuthController = require('./auth.controller')
const authController = new AuthController()

// Auth
router.route('/login').post(authController.login)
router.route('/register').post(authController.insert)

module.exports = router