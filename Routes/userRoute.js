const express = require('express')
const userController = require('../controllers/userController')
const router = express()

// Get all user
router.get("/", userController.getAllUser)

// Get one user
router.get("/:id", userController.getOneUser)

// Delete user
router.delete("/:id", userController.deleteUser)

module.exports = router