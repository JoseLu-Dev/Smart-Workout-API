const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwt-config')

/**
* Middleware that verifies jwt
* @param {*} req
* @param {*} res
* @param {*} next
*/
module.exports = function jwtMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(
            token,
            process.env.SECRET_TOKEN,
            { algorithm: jwtConfig.algorithm },
            (err, decoded) => {
                if (err) return res.sendStatus(403);

                req.userId = decoded.userId;

                next();
            },
        );
    } else {
        res.sendStatus(401);
    }
}
