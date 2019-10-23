const chai = require('chai')
chai.use(require('chai-json'))

const expect = chai.expect
const axios = require('axios')

const route = 'http://localhost:8626'

describe('Home Test Suite', () => {
  describe('GET /', async () => {
    let response
    before(async () => {
      response = await axios.get(route).then(resp => {
        return resp.data
      })
    })

    it('should return JSON', () => {
      expect(response).to.be.a.jsonObj()
    })

    it('should have property id', () => {
      expect(response).to.have.property('id')
    })
  })
})
