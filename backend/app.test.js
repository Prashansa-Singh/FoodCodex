const request = require('supertest')
const app = require('./app')

it('SuperTest', () => { })


/**
 * Home: ~/
 */
describe('Home ~', () => {
    it('GET / ---> 200', () => {
        return request(app).get('/').expect(200)
    })

    it('GET * ---> 404', () => {
        return request(app).get('/whatever').expect(404)
    })
})

