const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const userSchema = new mongoose.Schema({
  name: { type: String },
  surname: { type: String },
  email: { type: String },
  admin: { type: Boolean, default: false },
  superAdmin: { type: Boolean, unique: true },
  pass_hash: { type: String, required: true },
  date_created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema)
