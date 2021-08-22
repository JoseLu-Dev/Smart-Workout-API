require('dotenv').config()
const connectToDatabase = require('./mongoDB')
const setMiddleware = require('./middleware/middleware')
const setRoutes = require('./routes')

const express = require('express')

const app = express()

// Set database connection and configuration
connectToDatabase()

// Set middleware of app
setMiddleware(app)

// Route to test connection
app.get('/auth', async (req, res) => {
  res.sendStatus(200)
})

// Set app routes
setRoutes(app)

// Start server on port from environment variables or default port
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`Server Started on port ${port}`)
})

module.exports = {
  app,
  server,
}
