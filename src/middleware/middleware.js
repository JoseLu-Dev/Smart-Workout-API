const cors = require('cors')
const express = require('express');
const jwt = require('jsonwebtoken');

/**
 * Middleware to exclude a middleware from a specified route
 * @param {*} path route to exclude middleware
 * @param {*} middleware middleware to exclude
 */
var excludeMiddlewareFromRoute = function(middleware, path) {
    return function(req, res, next) {
        if (req.path.includes(path)) {
            return next();
        } else {
            return middleware(req, res, next);
        }
    };
};

/**
 * Sets the middleware that the app uses
 * @param {*} app Express app
 */
function setMiddleware(app) {
    // control from what ip to accept request
    app.use(cors())

    // json middleware
    app.use(express.json())

    // log middleware
    app.use((req, res, next) => {
        console.log(`method: ${req.method}`)
        console.log(`path: ${req.path}`)
        console.log(`body: ${JSON.stringify(req.body)}`)
        console.log(`Auth header: ${req.headers.authHeader}`)
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

    /**
     * Middleware that verifies jwt
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    function jsonWebTokenVerification(req, res, next){
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            //TODO: extract jwt config to a common file
            jwt.verify(token, process.env.SECRET_TOKEN, { algorithms: ['HS256'] }, (err, decoded) => {
                if (err) return res.sendStatus(403);

                req.params.userId = decoded.userId;
                console.log(`User id: ${req.userId}`)
                next();
            });
        } else {
            res.sendStatus(401);
        }
    }

    app.use(excludeMiddlewareFromRoute(jsonWebTokenVerification, '/auth'))

}

module.exports = setMiddleware