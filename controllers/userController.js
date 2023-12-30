const User = require('../models/userModel')

const userController = {
    // Get all user
    getAllUser: async (req, res) => {
        try {
            const user = await User.find()
            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    // get one user
    getOneUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    // Delete user
    deleteUser: async (req, res) => {
        try {
            await User.findById(req.params.id)
            // await User.findByIdAndDelete(res.params.id)
            return res.status(200).json({ messange: "Delete successfuly!" })
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = userController