const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minlength: 6,
        maxLength: 30,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 8,
        maxLength:20
    },
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    googleId: {
        type: String
    },
    accessToken: {
        type: String
    },
    avatar: {
        type: String
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }]
}, { timestamps: true }
)

module.exports = mongoose.model("User",userSchema)