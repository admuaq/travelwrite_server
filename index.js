require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const helmet = require('helmet')
const app = express()

const port = process.env.PORT
const dUrl = process.env.MONGO_URL

app.use(helmet())
app.use(express.json())
app.use(morgan('tiny'))

const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const usersRoute = require('./routes/users')

app.use('/api/posts', postRoute)
app.use('/api/users', usersRoute)
app.use('/api/auth', authRoute)

mongoose.connect(dUrl, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', (err) => {
  console.error('Could not connect to MongoDB', err)
})

db.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(port, () => console.log(`Listening on port ${port}...`))
})
