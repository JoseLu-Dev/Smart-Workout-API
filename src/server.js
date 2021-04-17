require('dotenv').config()
require('./database/mongo')
import setMiddleware from './middleware'
import setExpressVariables from './expressVariables'

const express = require('express')
const app = express()


setMiddleware(app)
setExpressVariables(app)

// routers
const usersRouter = require('./routes/users')

app.use('/users', usersRouter)

// listen to port
app.listen(app.get('port'), () => {
  console.log(`Server Started on port ${app.get('port')}`)
})
