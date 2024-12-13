

const dashboard = (req, res)=> {
 const data = req.userInfo
 res.status(200).json({
  success: true,
  message: 'Welcome to the dashboard',
  data: data
 })
}


module.exports= {
 dashboard
}