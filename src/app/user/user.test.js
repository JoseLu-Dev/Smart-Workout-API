const mongoose = require('mongoose')
const { server } = require('../../server')

const User = require('../user/user.model')

const {
    api
} = require('../common/helpers.testing')

beforeEach(async () => {
    await User.deleteMany({})
})

describe('Simple user queries', () => {
    test('Get users', async () => {
        await api
            .get('/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})