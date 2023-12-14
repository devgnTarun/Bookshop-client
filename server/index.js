// Import necessary modules
const cors = require('cors') // Cross-Origin Resource Sharing middleware
const express = require('express') // Express.js framework
const bodyParser = require('body-parser') // Parse incoming request bodies
const helmet = require('helmet') // Set various HTTP headers for security
const morgan = require('morgan') // HTTP request logger

// Create an instance of the Express application
const app = express()

// Import the authentication routes from a separate file
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/products')
// Middleware setup
app.use(express.json()) // Parse JSON in request bodies
app.use(cors()) // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()) // Parse JSON in request bodies using bodyParser
app.use(helmet()) // Set security-related HTTP headers
app.use(morgan('dev')) // Use Morgan for logging HTTP requests in development mode

// Main route to check if the server is running
app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Server is up and running!' })
})

// Routes for user authentication (mounted under /auth)
app.use('/auth', authRoutes)
app.use('/products', productRoutes)

// Start the server on port 4000
const PORT = 4000
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`))
