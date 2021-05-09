const BaseController = require('../common/base.controller')
const DaysModel = require('./days.model')

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
            const year = new Number(req.params.month) == 12 ?  new Number(req.params.year) + 1 : req.params.year
            lastDay = this.createDate(year, new Number(req.params.month) + 1, 1)
        } catch (err) {
            console.log(err)
            res.status(400).json({ error: err.message })
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
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(days)
    }

    getSingleDay = async (req, res) => {
        let firstDay
        let nextDay
        try {
            firstDay = this.createDate(req.params.year, req.params.month, req.params.day)
            const year = new Number(req.params.month) == 12 ?  new Number(req.params.year) + 1 : req.params.year
            nextDay = this.createDate(year, req.params.month, new Number(req.params.day) + 1)
        } catch (err) {
            console.log(err)
            res.status(400).json({ error: err.message })
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
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(day)
    }

    createDate(year, month, day) {
        month = month == 13 ? 1 : month

        month = month > 9 ? month : `0${month}`
        day = day > 9 ? day : `0${day}`

        return new Date(`${year}-${month}-${day}`)
    }
}

module.exports = ExercisesController
