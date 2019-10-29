require('dotenv').config()
const mongoose = require('mongoose')
const database = process.env.MONGO_URL
const Post = require('../controllers/post_controller')
// const Post = require('../models/Post')

describe('Post Controller Tests', () => {
  const nonExistentId = 200

  beforeAll(async () => {
    await mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
  })

  afterAll(async (done) => {
    await mongoose.disconnect()
    done()
  })

  describe('createPost', () => {
    function throwErrorNoTitleCreate () {
      Post.createPost('', 'asdsd')
    }

    it('should accept two arguments, title and content', () => {
      expect(Post.createPost.length).toEqual(2)
    })

    it('should throw error if title is empty', () => {
      expect(throwErrorNoTitleCreate).toThrow()
    })

    it('thrown error message should say "Title needs to be at least one character in length"', () => {
      expect(throwErrorNoTitleCreate).toThrow('Title needs to be at least one character in length')
    })
  })

  describe('updatePost', () => {
    function throwErrorNoTitleUpdate () {
      Post.updatePost(3, '', 'asdsd')
    }

    it('should throw error if title is empty and should say "Title needs to be at least one character in length"', () => {
      expect(throwErrorNoTitleUpdate).toThrow('Title needs to be at least one character in length')
    })

    it('should throw error if no post is found with message "Post not found" ', () => {
      expect(() => Post.updatePost(nonExistentId, 'a', 'asdsd')).toThrow('Post not found')
    })
  })

  describe('deletePost', () => {
    function throwErrorDelete () {
      Post.deletePost(nonExistentId)
    }

    it('should throw error post of given id has not been found', () => {
      expect(throwErrorDelete).toThrow('Post not found')
    })
  })
})
