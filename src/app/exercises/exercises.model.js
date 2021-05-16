const mongoose = require('mongoose')

const exercisesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    variations: {
        type: [String],
    },
    progressions: {
        type: [String],
    },
    muscleGroup: {
        type: String,
    },
    bodyWeight: {
        type: Boolean,
    },
    static: {
        type: Boolean,
    },
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
exercisesSchema.pre('save', lowerCaseName)

/**
 * Remove _id and __v from the object before converting it to json
 */
exercisesSchema.set('toJSON', {
    transform: (documents, returnedObject) => {
        // eslint-disable-next-line no-param-reassign
        delete returnedObject._id
        // eslint-disable-next-line no-param-reassign
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Exercises', exercisesSchema)
