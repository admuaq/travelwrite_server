require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()

const port = 8626

app.use(express.json())
app.use(morgan('tiny'))

const apiRoute = require('./routes/api')
const loginRoute = require('./routes/login')
const postRoute = require('./routes/posts')

app.use('/posts', postRoute)
app.use('/api', apiRoute)
app.use('/login', loginRoute)

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', (err) => {
  console.error('Could not connect to MongoDB', err)
})

db.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(port, () => console.log(`Listening on port ${port}...`))
})
