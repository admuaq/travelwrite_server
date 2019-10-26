const router = require('express').Router()

router.get('', (req, res) => {
  res.json({ id: 1, message: 'test' })
})

router.get('/:id', (req, res) => {
  res.json({ id: 1, message: 'test' })
})

module.exports = router
