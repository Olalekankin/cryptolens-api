
const User = require('../model/user')

const allUsers = async (req, res)=> {
 try {
  const fetchedUsers = await User.find({})
  if(fetchedUsers?.length > 0){
   res.status(200).json({
    success: true,
    message: 'users fetched successfully',
    data: fetchedUsers
   })
  } else {
   res.status(404).json({
    success: false,
    message: 'No user found'
   })
  }
 } catch (error) {
  console.error(error)
  res.status(500).json({
    success: false,
    message: 'Something went wrong',
    error: error.message,
  })
 }
}
const singleUser= async (req, res)=> {
 const userId = req.params.id;
 const user = await User.findById(userId)
 if(user) {
  res.status(200).json({
   success: true,
   message: 'user fetched successfully',
   data: user,
  })
 }
 
}
const addNewUser= async (req, res)=> {
 try {
   const formData = req.body;
   const newUser = await User.create(formData)
   if(newUser){
    res.status(201).json({
     success: true,
     message: 'User added successfully',
     data: newUser,
    })
   }
 } catch (error) {
  console.error(error)
  res.status(500).json({
    success: false,
    message: 'An error occurred while adding the user.',
    error: error.message,
  })
 }
}
const updateUser= async (req, res)=> {
 const userId = req.params.id;
 const formData = req.body;
 const newUpdatedUser = await User.findByIdAndUpdate(userId, formData, {
  new: true
 })
 if(!newUpdatedUser){
  res.status(404).json({
   success: false,
   message: 'Couldn\'t find user',
  })
 } else {
  res.status(201).json({
   success: true,
   message: 'User updated successfully',
   data: newUpdatedUser,
  })
 }
}
const deleteUser= async (req, res)=> {
 const userId = req.params.id
 const newDeletedUser = await User.findByIdAndDelete(userId)
 if (!newDeletedUser) {
   res.status(404).json({
     success: false,
     message: 'could\'nt find user',
   })
 } else {
   res.status(201).json({
     success: true,
     message: 'User deleted successfully',
     data: newDeletedUser,
   })
 }
}

module.exports = {
 allUsers,
 singleUser,
 addNewUser,
 deleteUser,
 updateUser
}