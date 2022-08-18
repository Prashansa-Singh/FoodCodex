// Import Express
const express = require('express');

// Set up app as express app
const app = express();

// Link router
const homeRouter = require('./routes/homeRouter');
app.use('/', homeRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("App is listening on port 8080")
});