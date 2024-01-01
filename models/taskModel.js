const mongoose = require('mongoose')

const taskShema = new mongoose.Schema({
    taskName: {
        type: String,
        minlength: 3,
        require: true
    },
    description: {
        type: String
    },
    startDate: {
        type: Date,
        require: true
    },
    endDate: {
        type: Date,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    }
})

module.exports = mongoose.model("Task", taskShema)