const User = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
                fullName: req.body.fullName,
                email: req.body.email,
                googleId: req.body.googleId,
                accessToken: req.body.accessToken,
                avatar: req.body.avatar,
            })

            // save to db
            const saved = await newUser.save()
            return res.status(200).json(saved)
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    // Login
    login: async (req, res) => {
        try {
            // Check usernames are not case sensitive
            const user = await User.findOne({ username: { $regex: new RegExp("^" + req.body.username + "$", "i") } })
            if (!user) {
                return res.status(404).json({
                    message: "Wrong username!"
                })
            }
            const validPass = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if (!validPass) {
                return res.status(404).json({
                    message: "Wrong password!"
                })
            }

            if (user && validPass) {
                // Create access token have user's id
                const accessToken = jwt.sign({
                    id: user.id
                },
                    process.env.JWT_ACCESS_KEY,
                    { expiresIn: "1h" }
                )

                // Create refresh token
                const refreshToken = jwt.sign({
                    id: user.id
                },
                    process.env.JWT_REFRESH_KEY,
                    { expiresIn: "356d" }
                )
                // Hide password after show information
                const info = await (await User.findById(user._id)).populate('tasks')
                const { password, ...others } = info._doc
                return res.status(200).json({ ...others, accessToken, refreshToken })
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = authController