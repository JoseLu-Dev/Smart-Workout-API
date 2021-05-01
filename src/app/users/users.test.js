const mongoose = require('mongoose')
const { server } = require('../../server')

const User = require('./users.model')

const {
    api,
} = require('../common/helpers.testing')

beforeEach(async () => {
    await User.deleteMany({})
})

describe('Get user data', () => {
    test('Ensure you can get user data sending a valid token', async () => {
        const user = {
            name: 'JoseLuDev',
            email: 'joseludev@gmail.com',
            password: 'securePassword',
            status: 'Active',
        }

        newUser = await new User(user).save()

        const response = await api
            .post('/auth/login')
            .send(user)
            .expect(200)

        authToken = response.body.token

        await api
            .get('/users')
            .set('Authorization', 'bearer ' + authToken)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Ensure you cannot get user data without sending a token', async () => {
        const user = {
            name: 'JoseLuDev',
            email: 'joseludev@gmail.com',
            password: 'securePassword',
            status: 'Active',
        }

        newUser = await new User(user).save()

        const response = await api
            .post('/auth/login')
            .send(user)
            .expect(200)

        authToken = response.body.token

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
