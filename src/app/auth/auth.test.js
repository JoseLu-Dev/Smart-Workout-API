const mongoose = require('mongoose')
const { server } = require('../../server')

const User = require('../user/user.model')

const {
    api,
} = require('../common/helpers.testing')

const user = {
    name: 'JoseLuDev',
    email: 'joseludev@gmail.com',
    password: 'securePassword',
}

beforeEach(async () => {
    await User.deleteMany({})
})

describe('Auth tests', () => {
    test('Register user', async () => {
        await api
            .post('/auth/register')
            .send(user)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    })

    test('Register two users with same credentials', async () => {
        await api
            .post('/auth/register')
            .send(user)
            .expect(201)

        await api
            .post('/auth/register')
            .send(user)
            .expect(409)
    })

    test('Register and  login without confirming email', async () => {
        await api
            .post('/auth/register')
            .send(user)
            .expect(201)

        await api
            .post('/auth/login')
            .send(user)
            .expect(400)
    })

    test('Register and login with incorrect password', async () => {
        await api
            .post('/auth/register')
            .send(user)
            .expect(201)

        user.password = 'wrongPassword'

        await api
            .post('/auth/login')
            .send(user)
            .expect(403)
    })

    test('Register and login with incorrect user', async () => {
        await api
            .post('/auth/register')
            .send(user)
            .expect(201)

        user.name = 'wrongName'

        await api
            .post('/auth/login')
            .send(user)
            .expect(404)
    })

    test('Email verification', async () => {
        const user = {
            name: 'JoseLuDev',
            email: 'joseludev@gmail.com',
            password: 'securePassword',
        }

        newUser = await new User(user).save()
        confirmationCode = await newUser.confirmationCode

        await api
            .get(`/auth/${confirmationCode}`)
            .send(user)
            .expect(200)

        await api
            .get(`/auth/${confirmationCode}`)
            .send(user)
            .expect(404)
    })

    test('Ensure token is sent on login', async () => {
        const user = {
            name: 'JoseLuDev',
            email: 'joseludev@gmail.com',
            password: 'securePassword',
        }

        newUser = await new User(user).save()
        confirmationCode = await newUser.confirmationCode

        await api
            .get(`/auth/${confirmationCode}`)
            .send(user)
            .expect(200)

        const response = await api
            .post('/auth/login')
            .send(user)
            .expect(200)

        expect(typeof response.body.token).toBe('string')
    })

    test('Ensure re send verification email route works', async () => {
        const user = {
            name: 'JoseLuDev',
            email: 'joseludev@gmail.com',
            password: 'securePassword',
        }

        newUser = await new User(user).save()

        await api
            .post('/auth/reSendVerificationEmail')
            .send({ email: newUser.email })
            .expect(200)

        await api
            .get(`/auth/${newUser.confirmationCode}`)
            .send(user)
            .expect(200)

        await api
            .post('/auth/reSendVerificationEmail')
            .send({ email: newUser.email })
            .expect(400)

        newUser.email = 'falseEmail@gmail.com'

        await api
            .post('/auth/reSendVerificationEmail')
            .send({ email: newUser.email })
            .expect(404)
    })
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})
