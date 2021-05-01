const BaseController = require('../common/base.controller')
const UsersModel = require('./users.model')

class UsersController extends BaseController {
    constructor() {
      super(UsersModel)
    }

    // TODO: extract this to a middleware for user routes
    get(req, res) {
      req.params.id = req.params.userId
      super.get()
    }
}

module.exports = UsersController
