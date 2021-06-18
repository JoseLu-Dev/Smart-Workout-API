const BaseController = require('../common/base.controller')
const DaysModel = require('./days.model')
const TrainingsModel = require('../trainings/trainings.model')

class ExercisesController extends BaseController {
    constructor() {
        super(DaysModel)
    }

    /**
     * Gets all the days of the user
     * given a month and year
     * @param {*} req 
     * @param {*} res 
     */
    getByYearAndMonth = async (req, res) => {

        let firstDay
        let lastDay
        try {
            firstDay = this.createDate(req.params.year, req.params.month, 1)
            const year = new Number(req.params.month) == 12 ? new Number(req.params.year) + 1 : req.params.year
            lastDay = this.createDate(year, new Number(req.params.month) + 1, 1)
        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: err.message })
        }

        let days
        try {
            days = await this.model.find(
                {
                    userId: req.userId,
                    date: { $gte: firstDay, $lt: lastDay }
                })
        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: err.message })
        }
        res.status(200).json(days)
    }

    /**
     * Gets one day of the user
     * given a day, month and year
     * @param {*} req 
     * @param {*} res 
     */
    getSingleDay = async (req, res) => {
        let firstDay
        let nextDay
        try {
            firstDay = this.createDate(req.params.year, req.params.month, req.params.day)
            const year = new Number(req.params.month) == 12 ? new Number(req.params.year) + 1 : req.params.year
            nextDay = this.createDate(year, req.params.month, new Number(req.params.day) + 1)
        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: err.message })
        }

        let day
        try {
            day = await this.model.findOne(
                {
                    userId: req.userId,
                    date: { $gte: firstDay, $lt: nextDay }
                })
        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: err.message })
        }
        res.status(200).json(day)
    }

    /**
     * Updates an existing day concatenating two object properties which are arrays
     * if the day does not exist (model uses userID and date as key) it creates a new exercise
     * @param {*} req 
     * @param {*} res 
     */
    put = async (req, res) => {
        console.log(req.body.date)
        const trainingSpecs = req.body.trainings[req.body.trainings.length-1]
        if (!trainingSpecs?.id) {
            try {
                const training = new TrainingsModel({ userId: req.userId, date: req.body.date })
                training.save((err, item) => {
                    // 11000 is the code for duplicate key error
                    if (err && err.code === 11000) {
                        return res.sendStatus(409)
                    }
                    if (err) {
                        console.error(err)
                        return res.sendStatus(500);
                    }
                })
                trainingSpecs.id = training._id
                this.model.updateOne({ userId: req.userId, date: req.body.date }, req.body, { upsert: true }, (err) => {
                    if (err) {
                        console.error(err);
                        return res.sendStatus(400)
                    }
                    return res.status(200).json( trainingSpecs.id )
                })
            } catch {
                return res.sendStatus(500)
            }
        }


    }

    createDate(year, month, day) {
        month = month == 13 ? 1 : month

        month = month > 9 ? month : `0${month}`
        day = day > 9 ? day : `0${day}`

        return new Date(`${year}-${month}-${day}`)
    }
}

module.exports = ExercisesController
