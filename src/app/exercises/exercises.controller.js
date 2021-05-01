const BaseController = require('../common/base.controller')
const ExercisesModel = require('./exercises.model')

class ExercisesController extends BaseController {
    constructor() {
        super(ExercisesModel)
    }

    put(req, res) {
        this.model.updateOne({ name: req.body.name }, req.body, { upsert: true }, (err) => {
            // 11000 is the code for duplicate key error
            if (err && err.code === 11000) {
                res.sendStatus(400);
            }
            if (err) {
                return console.error(err);
            }
            res.sendStatus(200);
        });
    }
}

module.exports = ExercisesController
