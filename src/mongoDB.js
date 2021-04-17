const mongoose = require('mongoose')

/**
 * Sets the connection to the database
 */
function connectToDatabase() {

  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  const db = mongoose.connection
  db.on('error', (error) => console.error(error))
  db.once('open', () => console.log(`Connected to Database url ${process.env.DATABASE_URL}`))
}

module.exports = connectToDatabase