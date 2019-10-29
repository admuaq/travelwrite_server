const Post = require('../models/Post')
const mongoose = require('mongoose')

async function seedPosts () {
  console.log('Seeding Posts')
  let postsData = [
    new Post({ title: 'test1', content: 'asd' }),
    new Post({ title: 'test2', content: 'fgh' }),
    new Post({ title: 'test3', content: 'jkl' }),
    new Post({ title: 'test4', content: 'qwe' })
  ]

  await postsData.forEach(post => post.save().catch(err => err))
  console.log('Finished seeding Posts')
}

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', (err) => {
  console.error('Could not connect to MongoDB to seed data', err)
})

db.once('open', () => {
  console.log('Connected to MongoDB and ready to seed')
  seedPosts()
}).then(() => {
  mongoose.disconnect(() => {
    console.log('Finished Seeding and closing connection')
  })
})

// mongoose.connection.close(() => {
//   console.log('Finished Seeding and closing connection')
// })
