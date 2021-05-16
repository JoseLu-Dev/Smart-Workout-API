const mongoose = require('mongoose')
const { server } = require('../../server')
const _ = require('lodash');

const Exercises = require('./exercises.model')
const User = require('../users/users.model')

const {
    api,
} = require('../common/helpers.testing')

const exercises = [
    {
        name: 'Front lever pull ups',
        variations: ['Prone', 'Supine', 'Neutral'],
        progressions: ['Full', 'Straddle', 'Tuck Advanced', 'Tuck'],
        muscleGroup: 'Lats',
        bodyWeight: true,
        static: false,
    },
    {
        name: 'Planche press',
        variations: ['Prone', 'Supine', 'Neutral'],
        progressions: ['Full', 'Straddle', 'Tuck Advanced', 'Tuck'],
        muscleGroup: 'Shoulders',
        bodyWeight: true,
    },
    {
        name: 'Pull ups',
        variations: ['Prone'],
        muscleGroup: 'Lats',
        bodyWeight: true,
    },
]

const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDhkODZkMTBkZDVlOTQ0OTgxMjg2YjYiLCJpYXQiOjE2MTk4OTQ5Nzh9.tjR2x3KpWC_tu7M7c_Ct3KCOAOVqVxdwCLhO05uz0fs'

beforeEach(async () => {
    await Exercises.deleteMany({})
    await Exercises.insertMany(exercises)
})

describe('Patch one', () => {
    test('Should create new if does not exist', async () => {
        const newExercise = {
            name: 'Planche push ups',
            variations: ['Prone', 'Supine', 'Neutral'],
            progressions: ['Full', 'Straddle', 'Tuck Advanced', 'Tuck'],
            muscleGroup: 'Shoulders',
            bodyWeight: true,
        }

        await api
            .put('/exercises')
            .set('Authorization', 'bearer ' + authToken)
            .send(newExercise)
            .expect(200)

        const createdExercise = await Exercises.findOne({ name: newExercise.name })

        const sameExercise = createdExercise.name == newExercise.name
            && _.isEqual(createdExercise.variations, newExercise.variations)
            && _.isEqual(createdExercise.progressions, newExercise.progressions)
            && createdExercise.muscleGroup == newExercise.muscleGroup
            && createdExercise.bodyWeight == newExercise.bodyWeight

        expect(sameExercise).toBe(true)
    })

    test('Should update if it already exist', async () => {
        const toUpdateExercise = {
            name: 'Pull ups',
            variations: ['Supine'],
        }

        const preUpdateExercise = await Exercises.findOne({ name: toUpdateExercise.name })

        await api
            .put('/exercises')
            .set('Authorization', 'bearer ' + authToken)
            .send(toUpdateExercise)
            .expect(200)

        const updatedExercise = await Exercises.findOne({ name: toUpdateExercise.name })
        console.log(updatedExercise)

        expect([updatedExercise.variations[0], updatedExercise.variations[1]])
        .toMatchObject(preUpdateExercise.variations.concat(toUpdateExercise.variations))
    })
})

describe('Get all', () => {
    test('Should return all exercises', async () => {
        const response = await api
            .get('/exercises')
            .set('Authorization', 'bearer ' + authToken)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(exercises.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})
