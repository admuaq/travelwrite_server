const express = require('express')
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

app.listen(port, () => console.log(`Listening on port ${port}...`))
