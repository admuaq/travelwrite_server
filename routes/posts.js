const router = require('express').Router()
const Post = require('../controllers/postController') // controller

// CREATE
router.post('', (req, res) => {
  console.log('CREATE POST ROUTE:')
  const { title, content } = req.body
  console.log('before:', Post.all.length)
  const newPost = Post.createPost(title, content)
  console.log('after:', Post.all().length)
  console.log('after:', Post.all())
  res.json(newPost)
})

// READ
router.get('', (req, res) => {
  console.log('GET POST ROUTE (all):')
  res.json(Post.all())
})

// READ
router.get('/:id', (req, res) => {
  console.log('GET POST ROUTE (one):')
  const post = Post.findPost(req.params.id)
  console.log(post)
  res.json(post)
})

// UPDATE
router.put('/:id', (req, res) => {
  console.log('UPDATE POST ROUTE:')
  const { title, content } = req.body
  const post = Post.updatePost(req.params.id, title, content)

  console.log(post)

  res.json(post)
})

// DELETE
router.delete('/:id', (req, res) => {
  console.log('DELETE POST ROUTE:')
  console.log('before:', Post.all().length)
  const deletedPost = Post.deletePost(2)
  console.log('after:', Post.all().length)
  console.log('before:', Post.all())

  res.json(deletedPost)
})

module.exports = router
