const User = require("../models/userModel")
const bcrypt = require('bcrypt')


const authController = {
    // register
    register: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)

            // create new user
            const newUser = await new User({
                username: req.body.username,
                password: hashed,
                fullname: req.body.fullname,
                email: req.body.email,
                googleid: req.body.googleid,
                accestoken: req.body.accestoken,
                avatar: req.body.avatar,
            })

            // save to db
            const saved = await newUser.save()
            res.status(200).json(saved)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    // Login
    login: async (req, res) => {
        try {
            // Check usernames are not case sensitive
            const user = await User.findOne({ username: { $regex: new RegExp("^" + req.body.username + "$", "i") } })
            if (!user) {
                res.status(404).json({
                    message: "Wrong username!"
                })
            }
            const validPass = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if (!validPass) {
                res.status(404).json({
                    message: "Wrong passowrd!"
                })
            }

            if (user && validPass) {
                res.status(200).json(user)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = authController