const router = require('express').Router()

const MusclesController = require('./muscles.controller')

const musclesController = new MusclesController()

router.route('/').get(musclesController.getAll)
router.route('/').post(musclesController.save)
router.route('/:id').delete(musclesController.delete)

module.exports = router
