const router = require('express').Router()

const AuthController = require('./auth.controller')

const authController = new AuthController()

// Auth
router.route('/login').post(authController.login)
router.route('/register').post(authController.signup)
router.route('/:confirmationCode').get(authController.verifyUser)
router.route('/reSendVerificationEmail').post(authController.reSendVerificationEmail)

module.exports = router
