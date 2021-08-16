const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
    },
})

module.exports = mongoose.model('Data', dataSchema)
