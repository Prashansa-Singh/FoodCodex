const express = require('express');

const homeRouter = express.Router();
// controller here


homeRouter.get('/', (req, res) => {
    res.send("App is working")
});



module.exports = homeRouter;