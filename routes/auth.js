const router = require('express').Router()
const bcrypt = require('bcrypt')
const Joi = require('@hapi/joi')
const { User } = require('../models/User')
// const Setting = require('../models/Setting')

router.post('', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // deconstruct values from body
  const { email, password } = req.body
  let user = await User.findOne({ email })

  // check validation for finding user
  if (!user) return sendStatus(res)

  const validPassword = await bcrypt.compare(password, user.password)

  // check validation for finding user
  if (!validPassword) return sendStatus(res)

  res.send(true)
})

function validate (req) {
  const schema = Joi.object({
    password: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
  })
  return schema.validate(req)
}

function sendStatus (res) {
  return res.status(400).send('Invalid email or password')
}

module.exports = router
