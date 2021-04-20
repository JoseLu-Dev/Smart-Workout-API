const { app } = require('../../server')
const supertest = require('supertest')

const api = supertest(app)

module.exports = {
    api,
}
