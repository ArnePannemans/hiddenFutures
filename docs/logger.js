let loggingEnabled = false;

export function setLoggingEnabled(enabled) {
    loggingEnabled = enabled;
}
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
