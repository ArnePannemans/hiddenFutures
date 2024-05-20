import dotenv from 'dotenv';
dotenv.config();
const loggingEnabled = process.env.LOGGING_ENABLED === 'true';

const logger = {
    log: (...args) => {
        if (loggingEnabled) {
            console.log(...args);
        }
    },
    error: (...args) => {
        if (loggingEnabled) {
            console.error(...args);
        }
    },
    warn: (...args) => {
        if (loggingEnabled) {
            console.warn(...args);
        }
    },
    info: (...args) => {
        if (loggingEnabled) {
            console.info(...args);
        }
    },
};

export default logger;
