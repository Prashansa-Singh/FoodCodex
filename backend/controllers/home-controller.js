const OK200 = (req, res) => {
    res.sendStatus(200, 'OK')
}

const NotFound404 = (req, res) => {
    res.sendStatus(404, 'Not Found')
}

const aboutUs = (req, res) => {
    res.send('https://github.com/Programming-Quokkas')
}

const contactUs = (req, res) => {
    res.send('https://github.com/Programming-Quokkas/FoodCodex')
}

module.exports = {
    OK200,
    NotFound404,
    aboutUs,
    contactUs
}
