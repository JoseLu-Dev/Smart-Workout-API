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

module.exports = mongoose.model('Exercises', exercisesSchema)
