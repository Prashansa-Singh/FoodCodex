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
    let user;

    beforeAll(async () => {
        let rawUser = await User.findOne({
            userName: "yipp-217",
        });

        if (rawUser) {
            await User.deleteOne({ _id: rawUser._id })
        }
    })

    it('POST /signup ---> 201 Created', async () => {
        const response = await request(app).post('/account/signup').send({
            userName: 'yipp-217',
            password: 'akd9#n$d',
            displayName: 'Ed',
        })

        expect(response.status).toEqual(201)
    })

    it('POST /validate-user ---> Invalid User (null)', async () => {
        const response = await request(app).post('/user/validate-user').send({
            username: 'NON-EXISTENT-USER',
            password: 'DOES NOT EXIST',
        })

        expect(response.status).toEqual(200);
        expect(response.text).toEqual('');
    })

    it('POST /validate-user ---> User (JSON)', async () => {
        let rawUser = await User.findOne({
            userName: "yipp-217",
        });

        user = rawUser;

        const response = await request(app).post('/user/validate-user').send({
            username: user.userName,
            password: user.password,
        })

        expect(response.status).toEqual(200);

        let expectedObject = {
            _id: user._id.toString(),
            userName: user.userName,
            displayName: user.displayName,
            __v: 0,
        }

        let parseResponse = JSON.parse(response.text)

        expect(parseResponse).toMatchObject(expectedObject);
    })

    it('DELETE /delete ---> 204 No Content', async () => {
        const response = await request(app).delete('/account/delete').send({
            userId: user._id.toString(),
        })

        expect(response.status).toEqual(204);
    })
})


/**
 * Restaurant Records: ~/user/restaurant
 */
describe('Restaurant Records: ~/user/restaurant', () => {
    let user;

    beforeAll(async () => {
        let rawUser = await User.findOne({
            userName: "test-217",
        });

        if (rawUser) {
            await request(app).delete('/account/delete').send({
                userId: rawUser._id.toString(),
            })
        }

        user_details = {
            userName: 'test-217',
            password: '123456789',
            displayName: 'TEST',
        }

        createUser = new User(user_details)
        user = await createUser.save()
    })

    it('POST /create-one --->', async () => {
        const req_body = {
            userId: user._id.toString(),
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

    it('DELETE /delete-one --->', async () => {
        let userRestaurants = await User.findById(user._id.toString(), "restaurants")

        expect(userRestaurants.restaurants).toEqual(expect.anything())

        let restaurantId;
        if (userRestaurants.restaurants.length >= 0) {
            restaurantId = userRestaurants.restaurants[0].toString()
        }

        const response = await request(app).delete('/user/restaurant/delete-one').send({
            restaurantId: restaurantId,
        })

        expect(response.status).toEqual(200);
        expect(response.text).toEqual(`Number of documents with restaurantId: ${restaurantId} is [Before Deletion: 1] and [After Deletion: 0].`)
    })

    afterAll(async () => {
        await request(app).delete('/account/delete').send({
            userId: user._id.toString(),
        })
    })
})