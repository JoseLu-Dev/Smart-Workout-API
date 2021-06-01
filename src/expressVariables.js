/**
 * Sets the variables that the app uses
 * @param {*} app Express app
 */
function setExpressVariables(app) {
    // port in which app will listen to
    app.set('port', process.env.PORT)
}

module.exports = setExpressVariables
