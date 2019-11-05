const auth = require('../middleware/auth')
const router = require('express').Router()
const { Post, validate } = require('../models/post') // Model

// CREATE
router.post('/', auth, async (req, res) => {
  console.log('CREATE POST:')

  console.log('before:', (await Post.find()).length)

  const { error } = validate(req.body)

  if (error) return res.status(404).send(error.details[0].message)

  let { title, content, user_id } = req.body

  if (!user_id) {
    user_id = req.user._id
  }

  const newPost = new Post({ title, content, user_id })
  try {
    await newPost.save()
  } catch (ex) {
    return res.status(404).send(ex.message)
  }

  res.json(newPost)
})

// Index
router.get('/', async (req, res) => {
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
