//
// APIs
//

const express = require('express')
const flash = require('express-flash')

const app = express()

app.use(flash())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

/* ------------------------------------------------------------------------- */
/* Environment */
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

/* Routers */
const homeRouter = require('./routes/home-router')
const userRouter = require('./routes/user-router')
const accountRouter = require('./routes/account-router')

/* Logger */
const logger = require('./logger')
app.use((request, response, next) => {
    logger.messageLogger.log('info', `${request.method}  ${request.path}`)
    next()
})

/* Database */
require('./models/db')

/* ========================================================================= */
// Link router
app.use('/account', accountRouter)
app.use('/user', userRouter)
app.use('/', homeRouter)

/* ========================================================================= */

module.exports = app
