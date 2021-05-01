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
        type: boolean,
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
userSchema.pre('save', lowerCaseName)

module.exports = mongoose.model('Exercises', exercisesSchema)
