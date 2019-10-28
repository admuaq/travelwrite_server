let index = 0
class Post {
  constructor (title, content) {
    this.id = index + 1
    this.title = title
    this.content = content

    index++
  }
}

module.exports = Post
