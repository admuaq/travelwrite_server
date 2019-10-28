const PostObject = require('../test/class/postClass') // Class
const dummyData = require('../test/dummyData')

const Post = {
  createPost (title, content) {
    if (title.length <= 0) {
      throw new Error('Title needs to be at least one character in length')
    }

    const newPost = new PostObject(title, content)
    dummyData.push(newPost)
    return newPost
  },
  findPost (id) {
    const post = dummyData.find(element => element.id === parseInt(id))
    return post
  },
  updatePost (id, title, content) {
    if (title.length <= 0) throw new Error('Title needs to be at least one character in length')

    const post = dummyData.find(element => element.id === parseInt(id))

    if (!post) throw new Error('Post not found')

    post.title = title
    post.content = content

    return post
  },
  deletePost (id) {
    const post = Post.findPost(id)

    if (!post) throw new Error('Post not found')

    const index = dummyData.indexOf(post)
    dummyData.splice(index, 1)
    return post
  },
  all () {
    return dummyData
  }
}

module.exports = Post
