const Joi = require('joi')

// Define a Joi schema for user validation
const userSchema = Joi.object({
  // Validate the 'firstName' field
  firstName: Joi.string().alphanum().min(3).max(30).required(),

  // Validate the 'lastName' field
  lastName: Joi.string().alphanum().min(3).max(30).required(),

  // Validate the 'password' field with a regex pattern
  password: Joi.string().pattern(
    new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:\'",.<>/?]{3,30}$'),
  ),

  // Validate the 'email' field with specific email constraints
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
})

// Export the user schema for use in other files
module.exports = userSchema
