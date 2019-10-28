const Post = require('../controllers/postController')

describe('Post Controller Tests', () => {
  describe('createPost', () => {
    it('should accept two arguments, title and content', () => {
      expect(Post.createPost.length).toEqual(2)
    })
  })

  // it('Can fetch 1 post from backend', (done) => {
  //   // console.log(route + '/3')
  //   return axios.get(route + '/3').then(res => {
  //     // console.log(res.data)
  //     expect(res.data.id).toEqual(3)
  //     done()
  //   })
  // })
})
