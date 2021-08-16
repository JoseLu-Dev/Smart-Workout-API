const router = require('express').Router()

const bandsRouter = require('./bands/bands.routes')
const dataRouter = require('./data/data.routes')

const UsersController = require('./users.controller')

const usersController = new UsersController()

router.use('', async (req, res, next) => {
    // TODO: check this
    req.params.id = req.userId
    next()
})

router.use('/bands', bandsRouter)
router.use('/data', dataRouter)

// Users
// router.route('/:id').delete(usersController.delete)

module.exports = router
