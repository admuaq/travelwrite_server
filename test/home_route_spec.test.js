const axios = require('axios')

const route = 'http://localhost:8626'

test('Can fetch data from backend', (done) => {
  return axios.get(route).then(res => {
    expect(res.data).toEqual({ id: 1, message: 'test' })
    done()
  })
})

test('Can fetch 1 message from backend', (done) => {
  return axios.get(route + '/1').then(res => {
    expect(res.data).toEqual({ id: 1, message: 'test' })
    done()
  })
})
