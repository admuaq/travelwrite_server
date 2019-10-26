const express = require('express')
const app = express()

const port = 8626

app.use(express.json())

const homeRoute = require('./routes/home')
const apiRoute = require('./routes/api')
const loginRoute = require('./routes/login')

app.use('/', homeRoute)
app.use('/api', apiRoute)
app.use('/login', loginRoute)

app.listen(port, () => console.log(`Listening on port ${port}...`))
