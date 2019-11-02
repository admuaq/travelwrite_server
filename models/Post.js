const mongoose = require('mongoose')
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

module.exports = mongoose.model('Post', postSchema)
