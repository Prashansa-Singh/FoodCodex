const request = require('supertest')
const app = require('./app')

it('SuperTest', () => { })


/**
 * Home: ~/
 */
describe('Home ~', () => {
    it('GET / ---> 200', (done) => {
        request(app).get('/')
            .expect(200)
            .end(done)
    })

    it('GET * ---> 404', (done) => {
        request(app).get('/whatever')
            .expect(404)
            .end(done)
    })
})

