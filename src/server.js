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

// routers
//const usersRouter = require('./routes')

//app.use('/users', usersRouter)

// listen to port
app.listen(app.get('port'), () => {
  console.log(`Server Started on port ${app.get('port')}`)
})
