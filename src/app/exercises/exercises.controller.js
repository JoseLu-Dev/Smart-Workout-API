const BaseController = require('../common/base.controller')
const ExercisesModel = require('./exercises.model')

class ExercisesController extends BaseController {
    constructor() {
        super(ExercisesModel)
    }

    /**
     * Updates an existing exercise
     * if the exercise does not exist (model uses name as key) it creates a new exercise
     * @param {*} req 
     * @param {*} res 
     */
    put = async (req, res) => {
        this.model.updateOne({ name: req.body.name }, req.body, { upsert: true }, (err) => {
            if (err) {
                res.sendStatus(400)
                return console.error(err)
            }
            res.sendStatus(200)
        });
    }

    getAllExercisesNames = async (req, res) => {
        try {
            let exercisesNames = await this.model.find({}).select({ name: 1, _id: 1 })

            res.status(200).json(exercisesNames)
        } catch (err) {
            res.sendStatus(400)
            return console.error(err)
        }
    }
}

module.exports = ExercisesController
