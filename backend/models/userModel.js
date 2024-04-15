const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: String,
    profilePic: String,
}, {
    timestamps: true,
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel