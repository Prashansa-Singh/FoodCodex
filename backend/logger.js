const {createLogger, transports, format} = require('winston')

const connectionLogger = createLogger({
    transports: [
        new transports.File({
            filename: 'connection.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.File({
            filename: 'connection-error.log',
            level: 'error',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

const messageLogger = createLogger({
    transports: [
        new transports.File({
            filename: 'messages.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.File({
            filename: 'messages-error.log',
            level: 'error',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

module.exports = {
    connectionLogger,
    messageLogger
}
