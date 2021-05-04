const encodings = require('iconv-lite/encodings')
const mongoose = require('mongoose')
const { server } = require('../../server')

const Days = require('./days.model')

const {
    api, getValidTokenAndUserId,
} = require('../common/helpers.testing')

let userInfo

generateDays = async () => {
    userInfo = await getValidTokenAndUserId()

    const days = [{
        userId: userInfo.id,
        date: new Date(2021, 10, 4).toDateString(),
        trainings: [
            {
                name: 'example',
                trainingId: 'exampleId',
                color: '#4477dd',
                completed: true,
            },
            {
                name: 'example',
                trainingId: 'exampleId',
                color: '#445533',
                completed: true,
            },
        ],
    }, {
        userId: userInfo.id,
        date: new Date(2021, 10, 20).toDateString(),
        trainings: [
            {
                name: 'example',
                trainingId: 'exampleId',
                color: '#4477dd',
                completed: true,
            },
            {
                name: 'example',
                trainingId: 'exampleId',
                color: '#445533',
                completed: true,
            },
        ],
    }, {
        userId: userInfo.id,
        date: new Date(2021, 9, 0).toDateString(),
        trainings: [
            {
                name: 'example',
                trainingId: 'exampleId',
                color: '#4477dd',
                completed: true,
            },
            {
                name: 'example',
                trainingId: 'exampleId',
                color: '#445533',
                completed: true,
            },
        ],
    }, {
        userId: userInfo.id,
        date: new Date(2021, 11, 1).toDateString(),
        trainings: [
            {
                name: 'example',
                trainingId: 'exampleId',
                color: '#4477dd',
                completed: true,
            },
            {
                name: 'example',
                trainingId: 'exampleId',
                color: '#445533',
                completed: true,
            },
        ],
    }, {
        userId: 'userId',
        date: new Date(2021, 10, 24).toDateString(),
        trainings: [
            {
                name: 'example',
                trainingId: 'exampleId',
                color: '#445533',
                completed: true,
            },
        ],
    }, {
        userId: 'userId',
        date: new Date(2021, 11, 1).toDateString(),
        trainings: [
            {
                name: 'example',
                trainingId: 'exampleId',
                color: '#4477dd',
                completed: true,
            },
        ],
    }]
    return days
}

beforeEach(async () => {
    // jest.useFakeTimers()
    await Days.deleteMany({})
    await Days.insertMany(generateDays())
})

describe('Get all', () => {
    test('Should return all days of a given month', async () => {
        // only 2 returns
        const response = await api
            .get('/days/2021/10')
            .set('Authorization', 'bearer ' + userInfo.token)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(2)
    })
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})
