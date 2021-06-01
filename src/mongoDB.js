const mongoose = require('mongoose')

/**
 * Sets the connection to the database
 */
function connectToDatabase() {
  const {
    DATABASE_URL_PRODUCTION,
    DATABASE_URL_DEVELOPMENT,
    DATABASE_URL_TEST, NODE_ENV,
  } = process.env

  let connectionString;

  switch (NODE_ENV) {
    case 'test':
      connectionString = DATABASE_URL_TEST
      break;
    case 'production':
      connectionString = DATABASE_URL_PRODUCTION
      break;
    default:
      connectionString = DATABASE_URL_DEVELOPMENT
      break;
  }

  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  const db = mongoose.connection
  db.on('error', (error) => console.error(error))
  db.once('open', () => console.log(`Connected to Database url ${connectionString}`))
}

module.exports = connectToDatabase
