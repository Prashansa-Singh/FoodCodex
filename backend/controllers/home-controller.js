const status200 = (req, res) => {
    res.sendStatus(200, 'OK');
}

const aboutUs = (req, res) => {
    res.send('https://github.com/Programming-Quokkas')
}

const contactUs = (req, res) => {
    res.send('https://github.com/Programming-Quokkas/FoodCodex')
}

module.exports = {
    status200,
    aboutUs,
    contactUs
}
