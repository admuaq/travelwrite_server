const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  date_start: { type: Date, default: Date.now },
  date_end: { type: Date, default: Date.now },
  date_created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Post', postSchema)
