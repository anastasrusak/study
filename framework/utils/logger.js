class Logger {

    /**
     * Log info message
     * @param {string} text text to log
     */
    info(text) {
        console.log(`[INFO] ${new Date()} ${text} [INFO]`)
    }

    /**
     * Log error message
     * @param {string} text text to log
     */
    error(text) {
        console.log(`[ERROR] ${new Date()} ${text} [ERROR]`)
    }
}

module.exports = new Logger();