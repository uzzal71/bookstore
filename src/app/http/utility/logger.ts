import winston from 'winston'

const { combine, timestamp, json } = winston.format

const logger = winston.createLogger({
    level: 'http',
    format: combine(timestamp(), json()),
    transports: [

    ]
})

logger.add(new winston.transports.Console({
    format: winston.format.simple(),
}));

export default logger;