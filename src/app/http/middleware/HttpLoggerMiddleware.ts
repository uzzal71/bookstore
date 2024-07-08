import morgan from 'morgan';
import logger from '../utility/logger';

export default morgan('combined',
    {
        stream: {
            write: (message) => logger.http(message.trim()),
        },
    }
);