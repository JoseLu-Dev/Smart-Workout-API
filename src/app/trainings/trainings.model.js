const mongoose = require('mongoose')

const exerciseSelected = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    variation: {
        type: String,
    },
    progression: {
        type: String,
    },
    muscleGroup: {
        type: String,
        required: true,
    },
    bodyWeight: {
        type: Boolean,
    },
    static: {
        type: Boolean,
    },
})

const bandUsed = new mongoose.Schema({
    color: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    twoEnds: {
        type: Boolean,
        required: true,
    },
    fullUse: {
        type: Boolean,
        required: true,
    },
})

const intensity = new mongoose.Schema({
    band: {
        type: bandUsed,
    },
    weight: {
        type: Number,
        required: true,
    },
})

const setPart = new mongoose.Schema({
    exercise: {
        type: exerciseSelected,
        required: true,
    },
    intensity: {
        type: intensity,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    rest: {
        type: Number,
        required: true,
    },
})

const trainingsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    setsDone: [{
        setParts: {
            type: setPart,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        setsCount: {
            type: Number,
            required: true,
        },
        finalRest: {
            type: Number,
            required: true,
        },
    }],
})

/**
 * Remove _id and __v from the object before converting it to json
 */
trainingsSchema.set('toJSON', {
    transform: (documents, returnedObject) => {
        // eslint-disable-next-line no-param-reassign
        returnedObject.id = returnedObject._id
        // eslint-disable-next-line no-param-reassign
        delete returnedObject._id
        // eslint-disable-next-line no-param-reassign
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Trainings', trainingsSchema)
