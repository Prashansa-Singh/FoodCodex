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
 * Account: ~/account and User ~/user
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

    it('POST /validate-user ---> Invalid User (null)', () => {
        request(app).post('/user/validate-user')
            .send({
                username: 'NON-EXISTENT-USER',
                password: 'DOES NOT EXIST',
            })
            .expect(200)
            .expect(null)
    })

    it('POST /validate-user ---> User (JSON)', () => {
        request(app).post('/user/validate-user')
            .send({
                username: 'X2',
                password: 'x',
            })
            .expect(200)
            .expect({
                _id: "6329beec08f04fcd7cd45a8e",
                userName: 'X2',
                password: 'x',
                displayName: 'X',
                restaurants: [],
                __v: 0,
            })
    })

    it('DELETE /delete ---> 204 No Content', () => {
        request(app).delete('/account/delete')
            .send({
                userName: 'yipp-217'
            })
            .expect(200)
    })
})


/**
 * Restaurant Records: ~/user/restaurant
 */
//  describe('Restaurant Records: ~/user/restaurant', () => {
//     it('POST /create-one --->', () => {
//         request(app).post('/account/signup')
//             .send({

//             })
//             .expect(201)
//     })

//     it('POST /update-one --->', () => {
//         request(app).post('/account/signup')
//             .send({

//             }) 
//             .expect(201)
//     })

//     it('POST /view-all --->', () => {
//         request(app).post('/account/signup')
//             .send({

//             })
//             .expect(201)
//     })

//     it('POST /delete-all --->', () => {
//         request(app).post('/account/signup')
//             .send({

//             })
//             .expect(201)
//     })
// })