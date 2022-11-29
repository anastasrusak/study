const logger = require('./utils/logger')
const BaseElement = require('../framework/baseElement')


class BaseForm {
    constructor(locator, name) {
        this.locator = locator;
        this.name = name;
        this.page = new BaseElement(this.locator, this.name)
    }

    /**
     * Check that page opened
     * @returns {<boolean>} 
     */
    async isPageOpened() {
        logger.info(`Check ${this.name} page is opened`);
        return this.page.isElementDisplayed();
    }

    /**
     * Wait for page is opened
     * @returns {<boolean>} 
     */
    async waitForPageOpened() {
        logger.info(`Wait for ${this.name} page is opened`);
        return this.page.waitForElementDisplayed();
    }

    /**
     * Check that page opened
     * @returns {<boolean>} 
     */
    async isPageClosed() {
        logger.info(`Check ${this.name} page is closed`);
        return this.page.waitForNotPresent();
    }

}

module.exports = BaseForm