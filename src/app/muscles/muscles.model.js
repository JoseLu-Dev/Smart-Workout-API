const mongoose = require('mongoose')

const musclesSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
})

/**
 * Remove _id and __v from the object before converting it to json
 */
musclesSchema.set('toJSON', {
    transform: (documents, returnedObject) => {
        // eslint-disable-next-line no-param-reassign
        returnedObject.id = returnedObject._id
        // eslint-disable-next-line no-param-reassign
        delete returnedObject._id
        // eslint-disable-next-line no-param-reassign
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Muscles', musclesSchema)
