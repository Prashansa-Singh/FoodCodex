const request = require('supertest')
const app = require('./app')
const { User } = require('./models/user')

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
        request(app).get('/invalid-route')
            .expect(404)
            .end(done)
    })
})


/**
 * Account: ~/account and User ~/user
 */
describe('Account ~/account', () => {
    beforeAll(async () => {
        let rawUser = await User.findOne({
            userName: "yipp-217",
        });

        if (rawUser) {
            await User.deleteOne({ _id: rawUser._id })
        }
    })

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
                displayName: 'X',
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
describe('Restaurant Records: ~/user/restaurant', () => {
    let user;

    beforeAll(async () => {
        user_details = {
            userName: 'yipp-217',
            password: 'akd9#n$d',
            displayName: 'Ed',
        }

        createUser = new User(user_details)
        user = await createUser.save()
    })

    it('POST /create-one --->', async () => {
        const req_body = {
            userId: user._id,
            name: "Hakata Gensuke Carlton",
            cuisine: "Japanese Ramen",
            address: "126 Lygon Street, Carlton 3053 Victoria",
            rating: 4.5,
            priceRating: 3,
            personalOption: false,
            halalOption: true,
            veganOption: true,
            vegetarianOption: true,
            pescatarianOption: true,
            nutsFreeOption: false,
            dairyFreeOption: false,
            glutenFreeOption: true,
            allergyFriendlyOption: false,
            diabetesFriendlyOption: true,
        }

        // console.log(req_body.name)
        // console.log(user._id.toString())

        const response = await request(app).post('/user/restaurant/create-one').send(req_body)
        expect(response.status).toEqual(200);
        expect(response.text).toEqual(`Done. ${req_body.name} has been added to this userId: ${user._id}.`)
    })

    // it('POST /update-one --->', () => {
    //     request(app).post('/account/signup')
    //         .send({

    //         })
    //         .expect(201)
    // })

    // it('POST /view-all --->', () => {
    //     request(app).post('/account/signup')
    //         .send({

    //         })
    //         .expect(201)
    // })

    // it('POST /delete-all --->', () => {
    //     request(app).post('/account/signup')
    //         .send({

    //         })
    //         .expect(201)
    // })

    // afterAll(async () => {
    //     let rawUser = await User.findOne({
    //         userName: "yipp-217",
    //     });

    //     if (rawUser) {
    //         await User.deleteOne({ _id: rawUser._id })
    //     }
    // })
})