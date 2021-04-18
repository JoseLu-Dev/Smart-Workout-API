const jwt = require('jsonwebtoken')

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
     */
    login = async (req, res) => {
        let user
        let samePassword
        try {
            user = await this.model.findOne({ name: req.body.name })
            if (!user) return res.status(404).json({ error: "User not found" })

            samePassword = await user.compareIfSamePassword(req.body.password)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
        if (!samePassword) return res.status(403).json({ message: "Invalid password" })

        if (user.status == "Pending") return res.status(400).json({ message: "You must confirm your email before continuing" })

        const token = await jwt.sign({ user: user }, process.env.SECRET_TOKEN)
        res.status(200).json({ token: token })
    }

    /**
     * Tries to register the user given the credentials sent in req.body
     * @param {*} req 
     * @param {*} res 
     */
    signup = async (req, res) => {

        let user = new this.model({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

        try {
            await user.save()

            if (process.env.NODE_ENV !== 'test') {
                nodemailerService.sendConfirmationEmail(
                    user.name,
                    user.email,
                    user.confirmationCode
                )
            }

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
}

module.exports = UserController