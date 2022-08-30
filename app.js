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
const PORT = process.env.PORT || 8080;

/* Environment */
// if ()...

/* Routers */
const homeRouter = require('./routes/homeRouter');



/* ========================================================================= */
// Link router
app.use('/', homeRouter);



/* ------------------------------------------------------------------------- */
app.listen(PORT, () => {
    console.log("App is listening on port" + PORT);
});
