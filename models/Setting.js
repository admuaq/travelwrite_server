const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const settingSchema = new mongoose.Schema({
  time_zone: { type: String, default: 'GMT+0' },
  lang_pref: { type: String, default: 'eng' },
  user_id: { type: 'ObjectId', ref: 'User', required: true }
})

module.exports = mongoose.model('Setting', settingSchema)
