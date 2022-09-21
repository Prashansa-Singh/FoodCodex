const request = require('supertest')
const app = require('./app')


/**
 * Control process and close connections
 */
let server, agent;

beforeEach((done) => {
    server = app.listen(4000, (err) => {
        if (err) return done(err);
        agent = request.agent(server);
        done();
    })
})

afterEach((done) => {
    return server && server.close(done);
})
/** --------------------------------- */


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

