const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User, validate } = require('../models/User')
const Setting = require('../models/Setting')

// Create new User
router.post('/', async (req, res) => {
  const { name, username, surname, email, password } = req.body

  // Check incoming data is valid with Joi
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email })

  if (user) return res.status(400).send('User already registered')

  // Create new user
  user = new User({ name, username, surname, email, password })
  const setting = new Setting({ user_id: user._id })

  const salt = await bcrypt.genSalt(13)
  user.password = await bcrypt.hash(password, salt)

  try {
    // Attempt to save user
    const savedUser = await user.save()
    const savedSetting = await setting.save()

    console.log(savedUser)
    console.log(savedSetting)

    // Send newly created user data to client
    return res.json(
      {
        _id: savedUser._id,
        name: savedUser.name,
        surname: savedUser.surname,
        username: savedUser.username,
        email: savedUser.email
      }
    )
  } catch (ex) {
    console.log(ex)
    return res.sendStatus(400).send(ex.errmsg)
  }
})

module.exports = router
