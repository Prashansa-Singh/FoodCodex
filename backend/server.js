//
// Server object
//

const app = require('./app');
const logger = require('./logger');

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    logger.connectionLogger.log('info', `App is listening on port ${PORT}`);
});
