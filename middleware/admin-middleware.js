// authorization middleware to check if user is an admin
const isAdmin = (req, res, next)=> {
 const role = req.userInfo.role;
 if(role !== 'admin'){
  return res.status(403).json({
   success: false,
   message: 'Access denied, admin right is required'
  })
 }
 next();
}


module.exports = isAdmin;