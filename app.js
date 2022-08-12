// Import Express
const express = require('express');

// Set up app as express app
const app = express();

// Link router
const homeRouter = require('./routes/homeRouter');
app.use('/', homeRouter);

app.listen(8080, () => {
    console.log("App is listening on port 8080")
});