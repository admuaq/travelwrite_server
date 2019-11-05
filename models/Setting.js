const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

mongoose.set('useCreateIndex', true)

const settingSchema = new mongoose.Schema({
  time_zone: {
    type: String,
    default: function () {
      return new Date().getTimezoneOffset() / 60
    }
  },
  lang_pref: { type: String, default: 'eng' },
  user_id: { type: 'ObjectId', ref: 'User', required: true }
})

function validateSetting (setting) {
  const schema = Joi.object({
    // Expect user to give ISO code
    lang_pref: Joi.string().min(3).max(3).required()
  })
  return schema.validate(setting)
}

module.exports = mongoose.model('Setting', settingSchema)
exports.validate = validateSetting
