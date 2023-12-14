const Joi = require('joi')

// Define a Joi schema for user login
const loginSchema = Joi.object({
  // Validate the 'email' field
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),

  // Validate the 'password' field with a regex pattern
  password: Joi.string().pattern(
    new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:\'",.<>/?]{3,30}$'),
  ),
})

// Export the login schema for use in other files
module.exports = loginSchema
