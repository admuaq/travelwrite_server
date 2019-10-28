const router = require('express').Router()
const Post = require('../controllers/post_controller') // controller

// CREATE
router.post('', (req, res) => {
  console.log('CREATE POST:')
  const { title, content } = req.body
  console.log('before:', Post.all.length)
  const newPost = Post.createPost(title, content)
  console.log('after:', Post.all().length)
  console.log('after:', Post.all())
  res.json(newPost)
})

// Index
router.get('', (req, res) => {
  console.log('GET POST (all):')
  res.json(Post.all())
})

// READ
router.get('/:id', (req, res) => {
  console.log('GET POST (one):')
  const post = Post.findPost(req.params.id)
  console.log(post)
  res.json(post)
})

// UPDATE
router.put('/:id', (req, res) => {
  console.log('UPDATE POST:')
  const { title, content } = req.body
  const post = Post.updatePost(req.params.id, title, content)

  console.log(post)

  res.json(post)
})

// DELETE
router.delete('/:id', (req, res) => {
  console.log('DELETE POST:')
  console.log('before:', Post.all().length)
  const deletedPost = Post.deletePost(2)
  console.log('after:', Post.all().length)
  console.log('before:', Post.all())

  res.json(deletedPost)
})

module.exports = router
