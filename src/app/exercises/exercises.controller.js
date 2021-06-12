const BaseController = require('../common/base.controller')
const ExercisesModel = require('./exercises.model')

class ExercisesController extends BaseController {
    constructor() {
        super(ExercisesModel)
    }

    /**
     * Updates an existing exercise concatenating two object properties which are arrays
     * if the exercise does not exist (model uses name as key) it creates a new exercise
     * @param {*} req 
     * @param {*} res 
     */
    put = async (req, res) => {
        this.model.updateOne({ name: req.body.name }, req.body, { upsert: true }, (err) => {
            if (err) {
                return console.error(err);
            }
            res.sendStatus(200);
        });
    }
}

module.exports = ExercisesController
