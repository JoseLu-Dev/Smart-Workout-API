const mongoose = require('mongoose')

const daysSchema = new mongoose.Schema({
    userId: {
        type: String,

    },
    date: {
        type: Date,

    },
    trainings: [{
        name: {
            type: String,
            required: true,
        },
        trainingId: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            required: true,
        },
    }],
})

/**
 * Transform the name to lowercase before saving it to the database
 * @param {*} next
 */
const lowerCaseName = async function (next) {
    const day = this;
    // eslint-disable-next-line no-restricted-syntax
    for (const training of day.trainings) {
        training.name = training.name.toLowerCase()
    }

    next()
}
daysSchema.pre('save', lowerCaseName)

/**
 * Remove _id and __v from the object before converting it to json
 */
daysSchema.set('toJSON', {
    transform: (documents, returnedObject) => {
        // eslint-disable-next-line no-param-reassign
        delete returnedObject._id
        // eslint-disable-next-line no-param-reassign
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Days', daysSchema)
