const mongoose = require('mongoose')

const taskShema = new mongoose.Schema({
    taskname: {
        type: String,
        require: true
    },
    decription: {
        type: String
    },
    startdate: {
        type: Date,
        require: true
    },
    enddate: {
        type: Date,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Task",taskShema)