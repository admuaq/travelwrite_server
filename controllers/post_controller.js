const Post = require('../models/Post') // Class

const PostController = {
  createPost (title, content) {
    if (title.length === 0) {
      throw new Error('Title needs to be at least one character in length')
    }

    const newPost = new Post({ title, content })
    newPost.save()
    return newPost
  },
  findPost (id) {
    const post = Post.findById(id)
    console.log(id)
    return post
  },
  updatePost (id, title, content) {
    if (title.length <= 0) throw new Error('Title needs to be at least one character in length')

    const post = Post.findById(id)

    if (post.id !== id) throw new Error('Post not found')

    post.title = title
    post.content = content

    return post
  },
  deletePost (id) {
    const post = Post.findById(id)

    if (post.id !== id) throw new Error('Post not found')

    return post
  },
  all () {
    return Post.find()
  }
}

module.exports = PostController
