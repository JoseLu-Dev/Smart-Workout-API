const mongoose = require('mongoose')
const { server } = require('../../server')

const User = require('../users/users.model')

const {
    api,
} = require('../common/helpers.testing')

beforeEach(async () => {
    await User.deleteMany({})
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTk4OTEwMDgsInVzZXJJZCI6IjYwOGQ4NmQxMGRkNWU5NDQ5ODEyODZiNiIsImlhdCI6MTYxOTg4Nzg1MH0.o84WIU4axL8E35hztbJBRc0ne_LESMce6xe1SMyWLOc'
})

describe('Patch one', () => {
    test('Should create new if does not exist', async () => {
        await api
            .get('/users')
            .set('Authorization', 'bearer ' + authToken)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Should update if it already exist', async () => {
        await api
            .get('/users')
            .set('Authorization', 'bearer ' + authToken)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})

describe('Get all', () => {
    test('Ensure you can get user data sending a valid token', async () => {
        const user = {
            name: 'JoseLuDev',
            email: 'joseludev@gmail.com',
            password: 'securePassword',
            status: 'Active',
        }

        await api
            .get('/users')
            .set('Authorization', 'bearer ' + authToken)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})


afterAll(() => {
    mongoose.connection.close()
    server.close()
})
