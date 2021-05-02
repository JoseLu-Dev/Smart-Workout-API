const mongoose = require('mongoose')
const { server } = require('../../server')

const User = require('./users.model')

const {
    api, getValidToken,
} = require('../common/helpers.testing')

beforeEach(async () => {
    await User.deleteMany({})
})

describe('Get user data', () => {
    test('Ensure you can get user data sending a valid token', async () => {
        const authToken = await getValidToken()

        await api
            .get('/users')
            .set('Authorization', 'bearer ' + authToken)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Ensure you cannot get user data without sending a token', async () => {
        const authToken = await getValidToken()

        await api
            .get('/users')
            .set('Authorization', 'bearer ' + authToken + 'invalid')
            .expect(403)

        await api
            .get('/users')
            .expect(401)
    })
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})
