//
//
//

const express = require('express');
const flash = require('express-flash')

const app = express();

app.use(flash())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

/* ------------------------------------------------------------------------- */
/* debugger, log message */
app.use((req, res, next) => {
    console.log('msg: ' + req.method + req.path)
    next()
})

/* ------------------------------------------------------------------------- */
const PORT = process.env.PORT || 8000;

/* Environment */
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

/* Routers */
const homeRouter = require('./routes/home-router');
const userRouter = require('./routes/user-router');
const restaurantRouter = require('./routes/restaurant-router');


/* Database */
require('./models/db')

/* ========================================================================= */
// Link router
app.use('/', homeRouter);

app.use('/user', userRouter);

app.use('/:userId/', restaurantRouter);

/* ------------------------------------------------------------------------- */
app.listen(PORT, () => {
    console.log("App is listening on port" + PORT);
});
