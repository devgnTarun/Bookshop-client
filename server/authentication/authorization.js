const jwt = require('jsonwebtoken')
require('dotenv').config()

// Authentication Middleware
const authorizeToken = (req, res, next) => {
  // Extract the JWT token from the 'Authorization' header
  const token = req.header('Authorization')

  // Check if the token is missing
  if (!token)
    return res.status(401).json({ error: 'Unauthorized - Token missing' })

  // Verify the token using the JWT_SECRET from the environment variables
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // Check if there's an error during token verification
    if (err)
      return res.status(403).json({ error: 'Unauthorized - Invalid token' })

    // If the token is valid, attach the user information to the request object
    req.user = user

    // Proceed to the next middleware or route handler
    next()
  })
}

// Export the authentication middleware for use in other files
module.exports = authorizeToken
