require('dotenv').config()
const axios = require('axios')
const mongoose = require('mongoose')
const testDatabase = process.env.TESTDB_URL
const { User } = require('../models/User')
const { Post, validate } = require('../models/Post')

describe('Post', () => {
  let user 

  beforeAll(async () => {
    await mongoose.connect(testDatabase, { useNewUrlParser: true, useUnifiedTopology: true }, function () {
      mongoose.connection.db.dropDatabase()
    })
  })

  afterAll(async (done) => {
    await mongoose.disconnect()
    done()
  })

  describe('should be able to',() => {

    let user = new User({
      name: 'freddie',
      username: 'weAreTheChampions',
      surname: 'mercury',
      email: 'f.mercury@example.com',
      password: 'asddd'
    })

    axios.post = jest.fn((obj) => {

      const { error } = validate(obj)

      if (error) return error

      const newPost = new Post(obj)

      try {
        newPost.save()
        return newPost
      } catch (err) {
        console.error(err)
        return err
      }
    })

    const postData = { title: 'test1', content: 'asd', user_id: user.id }

    function simulatePost(obj) {
      return axios.post(obj)
    }

    const post = simulatePost(postData)
    console.log(post)

    it('create a new post', () => {
      expect(validate(postData)).not.toHaveProperty('details')
      expect(typeof post).toBe('object')
      expect(post).toHaveProperty('title')
      expect(post).toHaveProperty('content')
      expect(post).toHaveProperty('user_id')
    })
    it.todo('edit a post')
    it.todo('delete a created post')
  })
})