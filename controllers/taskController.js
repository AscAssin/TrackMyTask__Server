const Task = require('../models/taskModel')
const User = require('../models/userModel')

const taskController = {

    // Create new task
    createNewTask: async (req, res) => {
        try {
            //Get new task form body
            const newTask = new Task(req.body)

            // Check owner of task
            if (req.body.user) {
                // Find the owner of task. then update task's for the
                // user's array tasks. then save the new task
                const user = User.findById(req.body.user)
                await user.updateOne({ $push: { tasks: newTask._id } })
                await newTask.save()
            }
            res.status(200).json(newTask)
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    // Delete task
    deleteTask: async (req, res) => {
        try {
            await Task.findByIdAndDelete(req.params.id)
            return res.status(200).json({ message: "Delete successfully." })
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    // Get all task
    getAllTask: async (req, res) => {
        try {
            const tasks = await Task.find({})
            return res.status(200).json(tasks)
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    // Get one task by id
    getOneTask: async (req, res) => {
        try {
            const task = await Task.findById(req.params.id)
            return res.status(200).json(task)
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    // update one task
    updateTask: async (req, res) => {
        try {
            const task = await Task.findById(req.params.id)
            await task.updateOne({ $set: req.body })
            return res.status(200).json({ message: "Update successfully." })
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = taskController