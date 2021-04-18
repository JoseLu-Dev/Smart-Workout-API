const BaseController = require('../common/base.controller')
const UserModel = require('../user/user.model')

class UserController extends BaseController {

    constructor() {
        super(UserModel)
    }

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

        const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN)
        res.status(200).json({ token: token })
    }
}

module.exports = UserController