const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    confirmationCode: {
        type: String,
        default: function() {
            let hash = 0;
            for (let i = 0; i < this.name.length; i++) {
                hash = this.name.charCodeAt(i) + ((hash << 5) - hash);
            }
            let res = (hash & 0x00ffffff).toString(16).toUpperCase();
            return "00000".substring(0, 6 - res.length) + res;
        }
    },
    registerDate: {
        type: Date,
        required: true,
        default: Date.now
    },
})

/**
 * Encrypts the user password using bcrypt before saving it to the database
 * @param {*} next 
 */
const encryptUserPassword = async function (next) {
    const user = this;
    if (!user.isModified('password')) return next()
    try {
        user.password = await bcrypt.hash(user.password, 10)
    } catch (error) {
        if (error) return next(error)
    }
    next()
}
userSchema.pre('save', encryptUserPassword)

module.exports = mongoose.model('User', userSchema)