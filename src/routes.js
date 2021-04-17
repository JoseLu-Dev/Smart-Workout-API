const express = require('express')

const userRouter = require('./app/user/user.routes')

/**
 * Sets app routes
 * @param {*} app express app
 */
function setRoutes(app) {

  const router = express.Router();

  // User routes
  router.use('/user', userRouter)

  // Apply the routes to our application
  app.use('', router);
}

module.exports = setRoutes