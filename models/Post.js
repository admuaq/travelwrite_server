const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

mongoose.set('useCreateIndex', true)

const postSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  long: { type: String },
  lat: { type: String },
  w3w: { type: String },
  journey_id: { type: 'ObjectId', ref: 'Journey' },
  user_id: { type: 'ObjectId', ref: 'User', required: true },
  date_created: { type: Date, default: Date.now }
})

function validatePost (post) {
  const schema = Joi.object({
    title: Joi.string().min(1).max(25).required(),
    content: Joi.string().max(600)
  })
  return schema.validate(post)
}

exports.Post = mongoose.model('Post', postSchema)
exports.validate = validatePost
