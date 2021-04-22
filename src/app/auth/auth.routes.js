const router = require('express').Router()

const AuthController = require('./auth.controller')

const authController = new AuthController()

// Auth
router.route('/login').post(authController.login)
router.route('/register').post(authController.signup)
router.route('/reSendVerificationEmail').post(authController.reSendVerificationEmail)
router.route('/verifyUser').post(authController.verifyUser)

module.exports = router
