const express = require('express')
const router = express.Router()
const {
  allUsers,
  singleUser,
  updateUser,
  deleteUser,
  addNewUser,
} = require('../controller/user')

// All routes
router.get('', allUsers) // Get all users
router.get('/:id', singleUser) // Get a single user by ID
router.post('/add', addNewUser) // Add a new user
router.put('/update/:id', updateUser) // Update user by ID
router.delete('/delete/:id', deleteUser) // Delete user by ID

// Export the router object to be used in other files
module.exports = router;
