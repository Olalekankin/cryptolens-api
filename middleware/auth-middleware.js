const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next)=> {
 // get
 const authKey = req.headers['authorization']
 const token = authKey && authKey.split(' ')[1]
 if(!token){
  return res.status(401).json({
   success: false,
   message: 'No token, Access denied, please login to access this route'
  })
 }

 try {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET,)
  req.userInfo = decodedToken
  console.log(decodedToken)
  next()
 } catch (error) {
  return res.status(500).json({
    success: false,
    message: 'Server error',
  })
 }
}



module.exports = authMiddleware