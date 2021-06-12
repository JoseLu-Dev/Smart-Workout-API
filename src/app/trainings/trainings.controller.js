const BaseController = require('../common/base.controller')
const TrainingsModel = require('./trainings.model')

class TrainingsController extends BaseController {
    constructor() {
        super(TrainingsModel)
    }
}

module.exports = TrainingsController
