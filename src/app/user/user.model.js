const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending',
    },
    confirmationCode: {
        type: String,
        default: function () {
            let hash = 0;
            for (let i = 0; i < this.name.length; i++) {
                hash = this.name.charCodeAt(i) + ((hash << 5) - hash);
            }
            const res = (hash & 0x00ffffff).toString(16).toUpperCase();
            return '00000'.substring(0, 6 - res.length) + res;
        },
    },
    registerDate: {
        type: Date,
        required: true,
        default: Date.now,
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

/**
 * Transform the user email to lowercase before saving it to the database
 * @param {*} next
 */
const lowerCaseEmail = async function (next) {
    const user = this;
    user.email = user.email.toLowerCase()
    next()
}
userSchema.pre('save', lowerCaseEmail)

/**
 * Compares user password with another passed in the argument
 * @param {*} candidatePassword password to compare with
 * @returns
 */
const compareIfSamePassword = async function (candidatePassword) {
    const samePassword = await bcrypt.compare(candidatePassword, this.password);
    if (samePassword) return true;
    return false;
}

userSchema.method(
    'compareIfSamePassword',
    compareIfSamePassword,
)

module.exports = mongoose.model('User', userSchema)
