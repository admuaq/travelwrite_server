const PostObject = require('../test/class/postClass') // Class
const dummyData = require('../test/dummyData')

const Post = {
  createPost (title, content) {
    const newPost = new PostObject(title, content)
    dummyData.push(newPost)
    return newPost
  },
  findPost (id) {
    const post = dummyData.find(element => element.id === parseInt(id))
    return post
  },
  updatePost (id, title, content) {
    const post = dummyData.find(element => element.id === parseInt(id))
    post.title = title
    post.content = content

    return post
  },
  deletePost (id) {
    const post = Post.findPost(id)
    const index = dummyData.indexOf(post)
    dummyData.splice(index, 1)
    return post
  },
  all () {
    return dummyData
  }
}

module.exports = Post
