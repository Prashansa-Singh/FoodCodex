const request = require('supertest')
const app = require('./app')

it('should run', () => {

})

/**
 * Home: ~/
 */
describe('Home', () => {
    it('GET / ---> 200', () => {
        return request(app).get('/').expect(200)
    })
})



