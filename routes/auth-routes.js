const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logoutUser, forgotPassword, resetPassword} = require('../controller/auth')

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);


module.exports = router;