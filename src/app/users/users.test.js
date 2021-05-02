const mongoose = require('mongoose')
const { server } = require('../../server')

const User = require('./users.model')

const {
    api, getValidTokenAndUserId,
} = require('../common/helpers.testing')

let userInfo

beforeEach(async () => {
    await User.deleteMany({})
    userInfo = await getValidTokenAndUserId()
})

describe('Get user data', () => {
    test('Ensure you can get user data sending a valid token', async () => {
        await api
            .get('/users')
            .set('Authorization', 'bearer ' + userInfo.token)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Ensure you cannot get user data without sending a token', async () => {
        await api
            .get('/users')
            .set('Authorization', 'bearer invalid')
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
