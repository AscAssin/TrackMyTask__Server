const express = require('express')
const taskController = require('../controllers/taskController')
const router = express()

// Create new task
router.post("/add", taskController.createNewTask)

// Delete task
router.delete("/delete", taskController.deleteTask)

// Get all task
router.get("/dashboard", taskController.getAllTask)

// Get one task
router.get("/dashboard/:id", taskController.getOneTask)

// Update task information
router.put("/update", taskController.updateTask)

module.exports = router