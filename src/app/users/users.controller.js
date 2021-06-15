const BaseController = require('../common/base.controller')
const UsersModel = require('./users.model')

class UsersController extends BaseController {
    constructor() {
      super(UsersModel)
    }
}

module.exports = UsersController
