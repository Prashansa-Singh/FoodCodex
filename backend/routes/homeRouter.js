const express = require('express');

const homeRouter = express.Router();

// Import controllers

// Requests
homeRouter.get('/', (req, res) => {
    res.send("App is working")
});

// Export router
module.exports = homeRouter;