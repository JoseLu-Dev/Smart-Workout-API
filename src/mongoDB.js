const mongoose = require('mongoose')

/**
 * Sets the connection to the database
 */
function connectToDatabase() {
  const { DATABASE_URL, DATABASE_URL_TEST, NODE_ENV } = process.env

  const connectionString = NODE_ENV == 'test'
    ? DATABASE_URL_TEST
    : DATABASE_URL

  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  const db = mongoose.connection
  db.on('error', (error) => console.error(error))
  db.once('open', () => console.log(`Connected to Database url ${process.env.DATABASE_URL}`))
}

module.exports = connectToDatabase
