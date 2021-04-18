require('dotenv').config()
const connectToDatabase = require('./mongoDB')
const setMiddleware = require('./middleware/middleware')
const setExpressVariables = require('./expressVariables')
const setRoutes = require('./routes')

const express = require('express')
const app = express()

connectToDatabase()
setMiddleware(app)
setExpressVariables(app)
setRoutes(app)

// listen to port
const server = app.listen(app.get('port'), () => {
  console.log(`Server Started on port ${app.get('port')}`)
})

module.exports = {
  app,
  server
}