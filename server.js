require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const connectToDb = require('./database/db')
const userRoutes = require('./routes/user-routes')
const authRoutes = require('./routes/auth-routes')
const proRoutes = require('./routes/protected-routes')
const courseRoutes = require('./routes/course-routes')

// connect to database
connectToDb()

// middleware express.json()
app.use(express.json())

// Routes
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1', proRoutes);
app.use('/api/v1/course', courseRoutes);

// Debug: List all registered routes
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(`Route: ${middleware.route.path} - Methods: ${Object.keys(middleware.route.methods)}`);
  }
});

// Catch-all route handler for unmatched routes
app.use((req, res) => {
  res.status(404).send(`Cannot ${req.method} ${req.url}`);
});

// start the server
app.listen(port, () => {
  console.log(`server is running at ${port}`)
})
