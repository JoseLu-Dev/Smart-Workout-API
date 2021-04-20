const cors = require('cors')
const express = require('express');

const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwt-config')

/**
 * Middleware to exclude a middleware from a specified route
 * @param {*} path route to exclude middleware
 * @param {*} middleware middleware to exclude
 */
const excludeMiddlewareFromRoute = function (middleware, path) {
    return function (req, res, next) {
        if (req.path.includes(path)) {
            return next();
        }
            return middleware(req, res, next);
    };
};

/**
 * Sets the middleware that the app uses
 * @param {*} app Express app
 */
function setMiddleware(app) {
    /**
     * Enable api to receive calls from every ip
     */
    app.use(cors())

    /**
     * Enable express to receive json in body calls
     */
    app.use(express.json())

    /**
     * Middleware that logs in console http calls information
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    function httpCallLogger(req, res, next) {
        console.log(`method: ${req.method}`)
        console.log(`path: ${req.path}`)
        console.log(`body: ${JSON.stringify(req.body)}`)
        console.log(`Auth header: ${req.headers.authHeader}`)
        next();
    }

    app.use(httpCallLogger)

    /**
     * Middleware to handle errors in a simple way
     * @param {*} err
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns
     */
    function simpleErrorHandling(err, req, res, next) {
        if (err) {
            console.error(err.stack)
            return res.status(500).send('Something went wrong')
        }
        next()
    }

    app.use(simpleErrorHandling)

    /**
     * Middleware that verifies jwt
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    function jsonWebTokenVerification(req, res, next) {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(
                token,
                process.env.SECRET_TOKEN,
                { algorithms: jwtConfig.algorithms },
                (err, decoded) => {
                    if (err) return res.sendStatus(403);

                    req.params.userId = decoded.userId;
                    console.log(`User id: ${req.userId}`)
                    next();
                },
);
        } else {
            res.sendStatus(401);
        }
    }

    app.use(excludeMiddlewareFromRoute(jsonWebTokenVerification, '/auth'))
}

module.exports = setMiddleware
