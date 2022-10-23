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
    let restaurantId;

    let req_body = {
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

    // setup user account
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

        user = user._id.toString()
        req_body['userId'] = user
    })

    it('POST /create-one ---> Create Restaurant Record', async () => {
        // console.log(req_body.name)
        // console.log(user._id.toString())

        const response = await request(app).post('/user/restaurant/create-one').send(req_body)

        expect(response.status).toEqual(200);
        expect(response.text).toEqual(`Done. ${req_body.name} has been added to this userId: ${user}.`)
    })

    it('POST /update-one ---> Update Restaurant Record', async () => {
        // get restaurant id to update record
        let userRestaurants = await User.findById(user, "restaurants")

        expect(userRestaurants.restaurants).toEqual(expect.anything())

        if (userRestaurants.restaurants.length >= 0) {
            restaurantId = userRestaurants.restaurants[0].toString()
        }

        expect(typeof restaurantId).toBe("string")

        // update cuisine field of the restaurant
        let edited_body = Object.assign(req_body, { restaurantId: restaurantId });
        edited_body["cuisine"] = "Noodles";

        // update record
        const response = await request(app).post('/user/restaurant/update-one').send(edited_body)

        expect(response.status).toEqual(200)
        expect(response.text).toEqual(`Done.  userId: ${user} with this restaurantId: ${restaurantId} record has been updated.`)
    })

    it('GET /view-one ---> Get Restaurant Record', async () => {
        const response = await request(app).get('/user/restaurant/view-one').send({
            userId: user,
            restaurantId: restaurantId
        })

        expect(response.status).toEqual(200);

        let expectedObject = Object.assign(req_body, {
            experiences: [],
            allVisits: [],
            __v: 0,
        })

        expectedObject['cuisine'] = "Noodles";
        delete expectedObject.userId
        delete expectedObject.restaurantId

        let parseResponse = JSON.parse(response.text)
        delete parseResponse._id

        // console.log(expectedObject)
        // console.log(parseResponse)

        expect(parseResponse).toMatchObject(expectedObject);
    })

    it('DELETE /delete-one ---> Delete Restaurant Record', async () => {
        const response = await request(app).delete('/user/restaurant/delete-one').send({
            restaurantId: restaurantId,
        })

        expect(response.status).toEqual(200);
        expect(response.text).toEqual(`Number of documents with restaurantId: ${restaurantId} is [Before Deletion: 1] and [After Deletion: 0].`)
    })

    afterAll(async () => {
        await request(app).delete('/account/delete').send({
            userId: user,
        })
    })
})

describe('Experience Records: ~/user/restaurant/experiences', () => {
    let user;
    let restaurantId;
    let experienceId;

    let create_restaurant_body = {
        name: "Ho Ho's Canteen",
        cuisine: "Middle Eastern and Italian",
        address: "University of Melbourne, Parkville, Melbourne",
        rating: 4.5,
        priceRating: 3,
    }

    let experience_body = {
        visitTime: Date.now(),
        title: "First Visit to Ho Ho's Canteen",
        comment: "One of the better places on campus for fresh, healthy options.",
    }

    it('Restaurant Experiences Test Setup ---> Create User + Add Restaurant to User', async () => {
        let rawUser = await User.findOne({
            userName: "test-514",
        });

        if (rawUser) {
            await request(app).delete('/account/delete').send({
                userId: rawUser._id.toString(),
            })
        }

        user_details = {
            userName: 'test-514',
            password: '987654321',
            displayName: '514',
        }

        // signup user
        const signup_response = await request(app).post('/account/signup').send(user_details);
        expect(signup_response.status).toEqual(201)

        let fetchUser = await User.findOne({
            userName: "test-514",
        });
        expect(typeof fetchUser._id).toEqual("object")
        user = fetchUser._id.toString();

        // create restaurant record for user
        create_restaurant_body['userId'] = user
        const add_restaurant = await request(app).post('/user/restaurant/create-one').send(create_restaurant_body)
        expect(add_restaurant.status).toEqual(200);
        expect(add_restaurant.text).toEqual(`Done. ${create_restaurant_body.name} has been added to this userId: ${user}.`)

        // get restaurant record id
        let userRestaurants = await User.findById(user, "restaurants")
        expect(userRestaurants.restaurants).toEqual(expect.anything())

        if (userRestaurants.restaurants.length >= 0) {
            restaurantId = userRestaurants.restaurants[0].toString()
        }
    })

    it('POST /create-one ---> Add Restaurant Experience', async () => {

    })

    afterAll(async () => {
        await request(app).delete('/account/delete').send({
            userId: user,
        })
    })
})