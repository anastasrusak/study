const {
    Builder,
    By
} = require('selenium-webdriver');

const until = require('selenium-webdriver/lib/until')
require("chromedriver");
require('geckodriver');
const BrowserFactory = require('./browserFactory.js')
const logger = require('./utils/logger')
const config = require('../config')
const timeouts = require('./timeouts.json')


class Browser {
    constructor() {}

    /**
     * Create driver
     * @returns {Promise<any>} driver 
     */
    async getInstance() {
        if (!this.driver) {
            this.driver = await new BrowserFactory().getDriver()
        }
        return this.driver
    }

    /**
     * Start session
     * @returns {void}  
     */
    async start() {
        this.driver = await this.getInstance()
        await this.driver.manage().window().maximize();
        await this.driver.get(config.url)
    }

    /**
     * Quite session
     * @returns {void}  
     */
    async quit() {
        await this.driver.quit()
        this.driver = null
    }

    /**
     * Check if alert is displayed
     * @returns {void}  
     */
    async alertIsDisplayed() {
        try {
            logger.info('Switch to alert')
            return await this.driver.switchTo().alert()
        } catch (e) {
            if (e.name === 'NoSuchAlertError') {
                logger.info('Alert was closed')
                return false
            } else {
                logger.error('Alert is not opened')
            }
        }
    }

    /**
     * Switch to alert
     * @returns {void} driver 
     */
    async switchToAlert() {
        logger.info('Switch to alert')
        return await this.driver.switchTo().alert()
    }

    /**
     * Get text alert
     * @returns {string} text 
     */
    async getAlertText() {
        this.alert = await this.alertIsDisplayed()
        logger.info('Get text from alert')
        return this.alert.getText()
    }

    /**
     * Accept alert
     * @returns {string}
     */
    async acceptAlert() {
        this.alert = await this.alertIsDisplayed()
        logger.info('Accept alert')
        return this.alert.accept()
    }

    /**
     * Send message to alert
     * @param {name} name
     * @returns {void}
     */
    async sentMessage(name) {
        this.alert = await this.alertIsDisplayed()
        logger.info(`Enter "${name}" text to alert`)
        await this.alert.sendKeys(name);
    }

    /**
     * Leave iframe
     * @returns {void}
     */
    async leaveIframe() {
        logger.info('Leave iframe')
        return await this.driver.switchTo().defaultContent();
    }

    /**
     * Get current url
     * @returns {void}
     */
    async getCurrentUrl() {
        logger.info('Get current url')
        return await this.driver.getCurrentUrl()
    }

    /**
     * Get all window handles
     * @returns {void}
     */
    async getAllWindowHandles() {
        logger.info('Get all window handles')
        return this.driver.getAllWindowHandles()
    }

    /**
     * Swith to the last window
     * @returns {void}
     */
    async switchToLastWindow() {
        await this.driver.wait(
            async () => {
                    return (await this.getAllWindowHandles()).length === 2
                },
                timeouts.explicit
        );
        logger.info('Switch to the last window')
        const windows = await this.getAllWindowHandles()
        await this.driver.switchTo().window(windows[windows.length - 1])
        return await this.driver.switchTo().window(windows[windows.length - 1])
    }

    /**
     * Swith to the first window
     * @returns {void}
     */
    async switchToFirstWindow() {
        logger.info('Switch to the first window')
        const windows = await this.getAllWindowHandles()
        return await this.driver.switchTo().window(windows[0])
    }

    /**
     * Close window
     * @returns {void}
     */
    async closeWindow() {
        logger.info('Close the window')
        await this.driver.close()
        await this.switchToFirstWindow();
        return await this.switchToFirstWindow();
    }
}

module.exports = new Browser();