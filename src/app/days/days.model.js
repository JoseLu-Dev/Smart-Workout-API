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
    const exercise = this;
    user.name = exercise.name.toLowerCase()
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
