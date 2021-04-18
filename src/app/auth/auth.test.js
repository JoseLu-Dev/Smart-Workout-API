const mongoose = require('mongoose')
const { server } = require('../../server')

const User = require('../user/user.model')

const {
    api
} = require('../common/helpers.testing')

const user = {
    name: "JoseLuDev",
    email: "joseludev@gmail.com",
    password: "securePassword"
}

beforeEach(async () => {
    await User.deleteMany({})
})

describe('Auth tests', () => {
    test('Register user', async () => {
        await api
            .post('/auth/register')
            .send(user)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Register two users with same credentials', async () => {
        await api
            .post('/auth/register')
            .send(user)
            .expect(200)

        await api
            .post('/auth/register')
            .send(user)
            .expect(409)
    })

    test('Register and  login with correct credentials', async () => {
        await api
            .post('/auth/register')
            .send(user)
            .expect(200)

        await api
            .post('/auth/login')
            .send(user)
            .expect(400)
    })

    test('Register and login with incorrect password', async () => {
        await api
            .post('/auth/register')
            .send(user)
            .expect(200)

        user.password = "wrongPassword"

        await api
            .post('/auth/login')
            .send(user)
            .expect(403)
    })

    test('Register and login with incorrect user', async () => {
        await api
            .post('/auth/register')
            .send(user)
            .expect(200)

        user.name = "wrongName"

        await api
            .post('/auth/login')
            .send(user)
            .expect(404)
    })
})

afterAll(() => {
    mongoose.connection.close()
    server.close() 
})