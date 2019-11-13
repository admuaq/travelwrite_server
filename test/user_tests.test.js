require('dotenv').config()
const axios = require('axios')
const mongoose = require('mongoose')
const testDatabase = process.env.TESTDB_URL
const { User, validate } = require('../models/User')
const { Post } = require('../models/Post')

describe('User', () => {
  beforeAll(async () => {
    await mongoose.connect(testDatabase, { useNewUrlParser: true, useUnifiedTopology: true }, function () {
      mongoose.connection.db.dropDatabase()
    })
  })

  afterAll(async (done) => {
    await mongoose.disconnect()
    done()
  })

  const dataToPost = {
    name: 'freddie',
    username: 'weAreTheChampions',
    surname: 'mercury',
    email: 'f.mercury@example.com',
    password: 'asddd'
  }

  describe('On posting data into registration field', () => {
    // simulating post endpoint
    axios.post = jest.fn((obj) => {
      const { error } = validate(obj)
      if (error) return error
      user = new User(obj)
      try{
        user.save()
        return user
      } catch (err) {
        console.error(err.message)
        return err
      }
    })

    function simulatePost(obj) {
      return axios.post(obj)
    }

    const newUser = simulatePost(dataToPost)

    it('should be able to create a valid User', () => {
      expect(validate(newUser)).not.toHaveProperty('details')
      expect(typeof newUser).toBe('object')
      expect(newUser).toHaveProperty('name')
      expect(newUser).toHaveProperty('username')
      expect(newUser).toHaveProperty('surname')
      expect(newUser).toHaveProperty('email')
    })
    
  })
})
