const User = require('../model/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// sign up logic
const registerUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName, username } = req.body

    // Check for existing email or username in one query
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    })

    if (existingUser) {
      // Determine the conflict type
      const conflictField = existingUser.email === email ? 'Email' : 'Username'
      return res.status(400).json({
        success: false,
        message: `${conflictField} already exists, Please try a different ${conflictField.toLocaleLowerCase()}`,
      })
    }
     const newUser = new User({
       email,
       password,
       firstName,
       lastName,
       username,
     })
    // Create new user
    const registeredUser = await newUser.save()
    return res.status(201).json({
      status: res.status,
      data: {
        success: true,
        message: 'User registered successfully',
        data: registeredUser,
      },
    })
  } catch (error) {
    console.error('Error in sign-up:', error)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    })
  }
}

// sign up logic
const loginUser = async (req, res) => {
  try {
    const {username, email, password } = req.body
    
    // Find user by username or email
    const user = await User.findOne({
      $or: [
        { username: username?.toLowerCase() },
        { email: email?.toLowerCase() },
      ],
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Username or email is not correct',
      })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password',
      })
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.setHeader('Content-Type', 'application/json')
    return res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      token,
      data: user,
    })
  } catch (error) {
    console.error('Error in login:', error)
    res.status(500).json({
      success: false,
      message: 'Something went wrong, please try again later.',
    })
  }
}

// sign up logic
const logoutUser = async (req, res)=> {

}
// sign up logic
const forgotPassword = async (req, res)=> {

}
// sign up logic
const resetPassword = async (req, res)=> {

}

module.exports = {
 registerUser,
 loginUser,
 logoutUser,
 resetPassword,
 forgotPassword
}