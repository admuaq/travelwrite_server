const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

mongoose.set('useCreateIndex', true)

const userSchema = new mongoose.Schema({
  name: { type: String, lowercase: true },
  surname: { type: String, lowercase: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, required: true, unique: true },
  admin: { type: Boolean, default: false },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  date_created: { type: Date, default: Date.now }
})

function validateUser (user) {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    name: Joi.string().min(3).max(25).required(),
    surname: Joi.string().min(2).max(25),
    password: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
  })
  return schema.validate(user)
}

exports.User = mongoose.model('User', userSchema)
exports.validate = validateUser
