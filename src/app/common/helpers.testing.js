const { app } = require('../../server')
const supertest = require('supertest')

const User = require('../users/users.model')

const api = supertest(app)

const getValidTokenAndUserId = async () => {
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

    const userInfo = {
        id: undefined,
        token: undefined,
    }
    userInfo.id = newUser.id
    userInfo.token = response.body.token

    return userInfo
}

module.exports = {
    api, getValidTokenAndUserId,
}
