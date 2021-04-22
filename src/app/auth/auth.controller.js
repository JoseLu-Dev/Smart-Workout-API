const jwt = require('jsonwebtoken')
const jwtConfig = require('../../jwt-config')

const BaseController = require('../common/base.controller')
const UserModel = require('../user/user.model')

const nodemailerService = require("../services/nodemailer.service")

class UserController extends BaseController {

    constructor() {
        super(UserModel)
    }


    /**
     * Tries to log in the user given the credentials sent in req.body
     * @param {*} req 
     * @param {*} res 
     * @return {code} 200 sends auth token
     * @return {code} 400 email not confirmed
     * @return {code} 403 invalid credentials
     * @return {code} 500 server error
     */
    login = async (req, res) => {
        let user
        let samePassword
        try {
            req.body.name = req.body.name.toLowerCase()
            user = await this.model.findOne({ name: req.body.name })
            if (!user) return res.status(403).json({ message: "Invalid credentials" })

            samePassword = await user.compareIfSamePassword(req.body.password)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
        if (!samePassword) return res.status(403).json({ message: "Invalid credentials" })

        if (user.status == "Pending") return res.status(400).json({ message: "You must confirm your email before continuing" })

        const token = jwt.sign(
            {
                exp: jwtConfig.exp,
                userId: user._id
            },
            process.env.SECRET_TOKEN,
            { algorithm: jwtConfig.algorithm },
        )

        res.status(200).json({ token: token })
    }

    /**
     * Tries to register the user given the credentials sent in req.body
     * @param {*} req 
     * @param {*} res 
     * @return {code} 201 created user
     * @return {code} 409 duplicated user
     * @return {code} 500 server error
     */
    signup = async (req, res) => {

        let user = new this.model({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

        try {
            await user.save()

            sendVerificationEmail(user)

            res.status(201).json({ message: "User was registered successfully! Please check your email to activate your Account" })

        } catch (err) {
            if (err.code == 11000) return res.status(409).json({ message: "Duplicated user" })
            return res.status(500).json({ message: err.message })
        }
    }

    /**
     * This Async Function tries to verify if the ConfirmationCode provided in the req param matches with one
     * saved in the DB (User model) and then proceeds to change its status to Active 
     * 
     * @param {*} req 
     * @param {*} res 
     * @return {code} 200 account activated
     * @return {code} 404 not suitable for verification
     * @return {code} 500 server error
     */
    verifyUser = async (req, res) => {
        let user
        try {
            user = await this.model.findOne({ 'confirmationCode': req.params.confirmationCode })
            if (user == null) return res.status(404).json({ message: 'This Account is not suitable for Activation' })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }

        user.status = user.schema.path('status').enumValues[1]
        user.confirmationCode = null

        try {
            await user.save()
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }

        res.status(200).json({ message: 'Account Activated' })
    }

    /**
     * This function re sends the confirmation email if the email has not been verified
     * @param {*} req 
     * @param {*} res
     * @return {code} 200 resend verification email
     * @return {code} 400 already verified
     * @return {code} 404 no email registered
     * @return {code} 500 server error
     */
    reSendVerificationEmail = async (req, res) => {
        req.body.email = req.body.email.toLowerCase()
        let user
        try {
            user = await this.model.findOne({ 'email': req.body.email })
            if (user == null) return res.status(404).json({ message: 'No account found with this email' })
            if (user.status == user.schema.path('status').enumValues[1]) return res.status(400).json({ message: 'This email has been already verified' })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }

        sendVerificationEmail(user)
        return res.status(200).json({ message: 'Verification email re sent successfully' })
    }
}

function sendVerificationEmail(user) {
    if (process.env.NODE_ENV !== 'test') {
        nodemailerService.sendConfirmationEmail(
            user.name,
            user.email,
            user.confirmationCode
        )
    }
}

module.exports = UserController