const request = require('supertest')
const app = require('./app')


/**
 * Test
 */
it('SuperTest should run', () => { })


/**
 * Home: ~/
 */
describe('Home ~', () => {
    it('GET / ---> 200 OK', (done) => {
        request(app).get('/')
            .expect(200)
            .end(done)
    })

    it('GET * ---> 404 Not Found', (done) => {
        request(app).get('/whatever')
            .expect(404)
            .end(done)
    })
})


/**
 * Account: ~/account
 */
describe('Account ~/account', () => {
    it('POST /signup ---> 201 Created', () => {
        request(app).post('/account/signup')
            .send({
                userName: 'yipp-217',
                password: 'akd9#n$d',
                displayName: 'Ed',
            })
            .expect(201)
    })

    it('DELETE /delete ---> 204 No Content', () => {
        request(app).delete('/account/delete')
            .send({
                userName: 'yipp-217'
            })
            .expect(204)
    })
})

