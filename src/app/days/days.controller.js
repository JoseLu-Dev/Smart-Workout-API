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
            firstDay = new Date(req.params.year, req.params.month, 1)
            lastDay = new Date(req.params.year, req.params.month + 1, 1)
        } catch (err) {
            console.log(err)
            res.status(400).json({ error: err.message })
        }

        let days
        try {
            days = await this.model.find(
                {
                    userId: req.params.userId,
                    date: { $gte: firstDay, $lt: lastDay }
                })
        } catch (err) {
            console.log(err)
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(days)
    }
}

module.exports = ExercisesController
