const mongoose = require('mongoose')

const bandsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
})

/**
 * Remove _id and __v from the object before converting it to json
 */
bandsSchema.set('toJSON', {
    transform: (documents, returnedObject) => {
        // eslint-disable-next-line no-param-reassign
        returnedObject.id = returnedObject._id
        // eslint-disable-next-line no-param-reassign
        delete returnedObject._id
        // eslint-disable-next-line no-param-reassign
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Bands', bandsSchema)
