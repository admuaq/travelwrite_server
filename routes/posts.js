const router = require('express').Router()
const Post = require('../controllers/post_controller') // controller

// CREATE
router.post('', async (req, res) => {
  console.log('CREATE POST:')
  const { title, content } = req.body
  console.log('before:', (await Post.all()).length)
  const newPost = Post.createPost(title, content)
  console.log('after:', (await Post.all()).length)
  console.log('after:', (await Post.all()))
  res.json(newPost)
})

// Index
router.get('', async (req, res) => {
  console.log('GET POST (all):')
  res.json(await Post.all())
})

// READ
router.get('/:id', async (req, res) => {
  console.log('GET POST (one):')
  const post = await Post.findPost(req.params.id)
  console.log(post)
  res.json(post)
})

// UPDATE
router.put('/:id', async (req, res) => {
  console.log('UPDATE POST:')
  const { title, content } = req.body
  const post = await Post.updatePost(req.params.id, title, content)

  console.log(post)

  res.json(post)
})

// DELETE
router.delete('/:id', async (req, res) => {
  console.log('DELETE POST:')
  console.log('before:', Post.all().length)
  const deletedPost = await Post.deletePost(2)
  console.log('after:', Post.all().length)
  console.log('before:', Post.all())

  res.json(deletedPost)
})

module.exports = router
