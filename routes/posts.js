const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

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
  const posts = await Post.find()
  res.json(posts)
})

// READ
router.get('/:id', async (req, res) => {
  console.log('GET POST (one):')
  const post = await Post.findById(req.params.id)
  res.json(post)
})

// UPDATE
router.put('/:id', async (req, res) => {
  console.log('UPDATE POST:')
  // const { title, content } = req.body
  const { error } = validate(req.body)

  if (error) return res.status(404).send(error.details[0].message)

  const post = await Post.findByIdAndUpdate(req.params.id, req.body)

  console.log(post)

  res.json(post)
})

// DELETE
router.delete('/:id', [auth, admin], async (req, res) => {
  console.log('DELETE POST:')
  console.log('before:', Post.find().length)
  const deletedPost = await Post.findByIdAndDelete(req.params.id)
  console.log('after:', Post.find().length)

  res.json(deletedPost)
})

module.exports = router
