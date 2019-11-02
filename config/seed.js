const Post = require('../models/Post')
const User = require('../models/User')
const Setting = require('../models/Setting')
const mongoose = require('mongoose')

async function seedPosts () {
  console.log('Seeding Posts')

  const foundAdmin = await User.findOne({ superAdmin: true }).catch(err => err)

  let postsData = [
    new Post({ title: 'test1', content: 'asd', user_id: foundAdmin.id }),
    new Post({ title: 'test2', content: 'fgh', user_id: foundAdmin.id }),
    new Post({ title: 'test3', content: 'jkl', user_id: foundAdmin.id }),
    new Post({ title: 'test4', content: 'qwe', user_id: foundAdmin.id })
  ]

  await postsData.forEach(post => {
    post.save().catch(err => err)
  })
  console.log('Finished seeding Posts')
}

// Setting is created alongside User
async function seedUsers () {
  console.log('Seeding Users')

  let users = [
    new User({
      name: 'Adham',
      surname: 'Muhammad',
      admin: true,
      superAdmin: true,
      email: 'test@example.com',
      pass_hash: 'test'
    })
  ]

  // new Setting Document is always created alongside a new User Document
  await users.forEach(user => {
    let setting = new Setting({ user_id: user.id })
    setting.save().catch(err => err)
    user.save().catch(err => err)
  })
  console.log('Finished seeding Users')
}

function closeConnection () {
  mongoose.connection.close(() => {
    console.log('Finished Seeding and closing connection')
  })
}

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', (err) => {
  console.error('Could not connect to MongoDB to seed data', err)
})

db.once('open', async () => {
  console.log('Connected to MongoDB and ready to seed')
  await seedUsers()
  await seedPosts()
  closeConnection()
})
// .then(() => {
//   mongoose.disconnect(() => {
//     console.log('Finished Seeding and closing connection')
//   })
// })
// mongoose.connection.close(() => {
//   console.log('Finished Seeding and closing connection')
// })
