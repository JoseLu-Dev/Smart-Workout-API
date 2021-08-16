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
        req.body.userId = req.userId
        this.model.updateOne({ userId: req.userId, name: req.body.name }, req.body, { upsert: true }, (err) => {
            if (err) {
                res.sendStatus(400)
                return console.error(err)
            }
            res.sendStatus(200)
        });
    }

    /**
     * Get an array of all exercises "name" and "_id" fields
     */
    getAllExercisesNames = async (req, res) => {
        try {
            let exercisesNames = await this.model.find({ userId: req.userId }).select({ name: 1, _id: 1 })

            res.status(200).json(exercisesNames)
        } catch (err) {
            res.sendStatus(400)
            return console.error(err)
        }
    }

    /**
     * Get an array of all exercises "name", "muscleGroup" and "_id" fields
     * that its names matches the search
     */
    getExercisesByName = async (req, res) => {
        if (!req.params.search) { res.sendStatus(400); }
        try {
            let exercises = await this.model.find({ userId: req.userId, name: { $regex: `${req.params.search}`, $options: 'i' } }).select({ name: 1, muscleGroup: 1, _id: 1 })
            res.status(200).json(exercises)
        } catch (err) {
            res.sendStatus(400)
            return console.error(err)
        }
    }

    /**
     * Get an array of the first 5 exercises "name", "muscleGroup" and "_id" fields
     */
    getFewExercises = async (req, res) => {
        try {
            let exercises = await this.model.find({}).select({ userId: req.userId, name: 1, muscleGroup: 1, _id: 1 }).limit(5)
            res.status(200).json(exercises)
        } catch (err) {
            res.sendStatus(400)
            return console.error(err)
        }
    }
}

module.exports = ExercisesController
