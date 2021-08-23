const BaseController = require('../common/base.controller')
const MusclesModel = require('./muscles.model')

class MusclesController extends BaseController {
    constructor() {
        super(MusclesModel)
    }

    muscles = [
        { name: 'Pecs' }, { name: 'Lats' }, { name: 'Upper Trapecius' }, { name: 'Middle Trapecius' }, { name: 'Low Trapecius' }, { name: 'Biceps' }, { name: 'Triceps' }, { name: 'Forearm' }, { name: 'Delts' },
        { name: 'Serratus' }, { name: 'Abs' }, { name: 'Rotator Cuff' }, { name: 'Oblique' }, { name: 'Calves' }, { name: 'Quads' }, { name: 'Hamstrings' }, { name: 'Gluteus' },
    ]

    /**
     * Get an array of muscles
     */
    getAll = async (req, res) => {
        try {
            let muscles = new Array(...this.muscles)
            let userMuscles = await this.model.find({ userId: req.userId })
            if (userMuscles) { muscles.push(...userMuscles) }
            res.status(200).json(muscles)
        } catch (err) {
            res.sendStatus(400)
            return console.error(err)
        }
    }

    save = async (req, res) => {
        req.body.userId = req.userId
        this.insert(req, res)
    }
}

module.exports = MusclesController
