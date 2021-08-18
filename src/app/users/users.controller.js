const BaseController = require('../common/base.controller')
const UsersModel = require('./users.model')

class UsersController extends BaseController {
    constructor() {
      super(UsersModel)
    }

    getUserData = async (req, res) => {
      req.params.id = req.userId
      this.get(req, res)
    }
}

module.exports = UsersController
