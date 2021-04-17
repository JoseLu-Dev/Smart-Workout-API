const cors = require('cors')
const express = require('express')

/**
 * Sets the middleware that the app uses
 * @param {*} app Express app
 */
function setMiddleware(app) {
    // control from what ip to accept request
    app.use(cors({ origin: 'http://localhost:4200' }))

    // json middleware
    app.use(express.json())

    // log middleware
    app.use((req, res, next) => {
        console.log(`method: ${req.method}`)
        console.log(`path: ${req.path}`)
        console.log(`body: ${JSON.stringify(req.body)}`)
        next();
    })

    // simple error handling middleware
    app.use((err, req, res, next) => {
        if (err) {
            console.error(err.stack)
            return res.status(500).send('Something went wrong')
        }
        next()
    })
}

module.exports = setMiddleware