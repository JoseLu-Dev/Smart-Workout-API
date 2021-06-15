const router = require('express').Router()

const bandsRouter = require('./bands/bands.routes')

const UsersController = require('./users.controller')

const usersController = new UsersController()

router.use('', async (req, res, next) => {
    // TODO: check this
    req.params.id = req.userId
    next()
})

router.use('/bands', bandsRouter)

// Users
router.route('').post(usersController.insert)
router.route('/:id').get(usersController.get)
router.route('/:id').put(usersController.update)
// router.route('/:id').delete(usersController.delete)

module.exports = router
