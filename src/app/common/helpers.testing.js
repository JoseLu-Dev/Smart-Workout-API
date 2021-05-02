const { app } = require('../../server')
const supertest = require('supertest')

const User = require('../users/users.model')

const api = supertest(app)

const getValidToken = async () => {
    await User.deleteMany({})

    const user = {
        name: 'testuser',
        email: 'testuser@gmail.com',
        password: 'testuser',
        status: 'Active',
    }

    newUser = await new User(user).save()

    const response = await api
        .post('/auth/login')
        .send(user)
        .expect(200)

    const authToken = response.body.token

    return authToken
}

module.exports = {
    api, getValidToken,
}

// mothod to login user and get jwt token to use it in http calls
