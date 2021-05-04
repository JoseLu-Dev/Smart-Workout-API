const express = require('express')

const usersRouter = require('./app/users/users.routes')
const authRouter = require('./app/auth/auth.routes')
const exercisesRoutes = require('./app/exercises/exercises.routes')
const daysRouter = require('./app/days/days.routes')

/**
 * Sets app routes
 * @param {*} app express app
 */
function setRoutes(app) {
  const router = express.Router();

  // Auth routes
  router.use('/auth', authRouter)

  // User routes
  router.use('/users', usersRouter)

  // Exercises routes
  router.use('/exercises', exercisesRoutes)

  // Days routes
  router.use('/days', daysRouter)

  // Apply the routes to our application
  app.use('', router);
}

module.exports = setRoutes
