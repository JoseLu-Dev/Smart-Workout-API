const BaseController = require('../common/base.controller')
const UserModel = require('./user.model')

class UserController extends BaseController {
    constructor() {
      super(UserModel)
    }

    // TODO: extract this to a middleware for user routes
    get(req, res) {
      req.params.id = req.params.userId
      super.get()
    }
}

module.exports = UserController
