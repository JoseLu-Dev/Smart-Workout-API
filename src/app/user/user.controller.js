const BaseController = require('../common/base.controller')
const UserModel = require('./user.model')

class UserController extends BaseController {

    constructor(){
      super(UserModel)
    }

}

module.exports = UserController