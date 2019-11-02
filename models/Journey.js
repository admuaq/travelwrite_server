const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const journeySchema = new mongoose.Schema({
  name: { type: String },
  country: { type: String },
  creator_id: { type: 'ObjectId', ref: 'User', required: true },
  collaborators: [{ type: 'ObjectId', ref: 'User', required: false }],
  date_start: { type: Date },
  date_end: { type: Date },
  date_created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Journey', journeySchema)
