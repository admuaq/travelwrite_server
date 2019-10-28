const axios = require('axios')
const Post = require('../controllers/postController') // controller

const route = 'http://localhost:8626/posts'

describe('Posts/Notes route', () => {
  const refData = Post.all()
  const postData = { title: 'Lebanon', content: 'asdsadsad' }
  const postData2 = { title: 'Chicago', content: 'this is the windy city' }

  describe('GET', () => {
    it('should be able to GET list of posts', (done) => {
      return axios.get(route).then(res => {
        expect(res.data).toEqual({ id: 1, message: 'test' })
        done()
      })
    })

    it('Can fetch 1 post from backend', (done) => {
      // console.log(route + '/3')
      return axios.get(route + '/3').then(res => {
        // console.log(res.data)
        expect(res.data.id).toEqual(3)
        done()
      })
    })
  })

  describe('POST', () => {
    it('Can create a new post', (done) => {
      return axios.post(route, postData).then(res => {
        expect(res.data.title).toBe(postData.title)
        expect(res.data.content).toBe(postData.content)
        // expect(refData.length).toBe(5)
        done()
      })
    })
  })

  describe('UPDATE', () => {
    it('Can edit a saved post', (done) => {
      return axios.put(route + '/2', postData2).then(res => {
        expect(res.data.title).toBe(postData2.title)
        expect(res.data.content).toBe(postData2.content)
        done()
      })
    })
  })

  describe('DELETE', () => {
    it('Can delete a post post', (done) => {
      return axios.delete(route + '/1').then(res => {
        expect(refData.length).toBe(4)
        done()
      })
    })
  })
})
