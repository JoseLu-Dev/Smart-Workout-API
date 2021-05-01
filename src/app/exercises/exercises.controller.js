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
        const currentExercise = await this.model.findOne({ name: req.body.name })
        if(currentExercise){ 
            if(currentExercise.variations){
                req.body.variations = currentExercise.variations.concat(req.body.variations)
            }
            if(currentExercise.progressions){
                req.body.progressions = currentExercise.progressions.concat(req.body.progressions)
            }
        }
        console.log(currentExercise)


        this.model.updateOne({ name: req.body.name }, req.body, { upsert: true }, (err) => {
            if (err) {
                return console.error(err);
            }
            res.sendStatus(200);
        });
    }
}

module.exports = ExercisesController
