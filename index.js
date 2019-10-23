const express = require('express')
const app = express()

const port = 8626

const home = require('./routes/home')
const api = require('./routes/api')

app.use('/', home)
app.use('/api', api)

app.listen(port, () => console.log(`Listening on port ${port}...`))
