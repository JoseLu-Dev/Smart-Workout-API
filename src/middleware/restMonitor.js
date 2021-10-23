const axios = require('axios')

/**
* Middleware uses an api to store api usage
* @param {*} req
* @param {*} res
* @param {*} next
*/
module.exports = function restMonitorMiddleware(req, res, next) {
    const start = process.hrtime()

    res.on('finish', () => {
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/calls',
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb3NlbHVkZXYiLCJpYXQiOjE2MzEyNjQyMDYsImV4cCI6MTYzMTg2OTAwNn0.xFcGSOMhR-8d5MXXvL9Geg-r7MdICwVY0iCQt_vSz8c6wXfAyqqbk3uAaSETBdIc-hroCTI4xOH58uF32vA5_w' },
            data: {
                'apiName': 'smart-workout',
                'method': req.method,
                'route': `${req.baseUrl}${req.route.path}`,
                'status': res.statusCode,
                'time': getDurationInMilliseconds(start),
            },
        }).then((response) => {
            console.log(response.data)
        }, (error) => {
            console.log(error)
        })
    });

    next()
}

const getDurationInMilliseconds = (start) => {
    const NS_PER_SEC = 1e9
    const NS_TO_MS = 1e6
    const diff = process.hrtime(start)

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}
