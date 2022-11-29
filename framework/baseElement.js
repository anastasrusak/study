const {
    By,
    Actions,
    until
} = require('selenium-webdriver');
const browser = require('./browser');
const logger = require('./utils/logger')
const timeouts = require('./timeouts.json')
class BaseElement {
    constructor(locator, name) {
        this.driver;
        this.locator = By.xpath(locator);
        this.name = name
    }

    /**
     * Find element
     * @returns {Promise<object>} element
     */
    async find() {
        logger.info(`Find "${this.name}" element`);
        this.driver = await browser.getInstance();
        return await this.driver.findElement(this.locator);
    }

    /**
     * Find elements
     * @returns {Promise<array<object>>} elements
     */
    async findElements() {
        logger.info(`Find "${this.name}" elements`);
        this.driver = await browser.getInstance();
        return await this.driver.findElements(this.locator);
    }

    /**
     * Wait if element is displayed
     * @returns {<Promise<boolean>>} true of false
     */
    async waitForElementDisplayed() {
        this.driver = await browser.getInstance();
        this.element = await this.driver.wait(until.elementLocated(this.locator))
        logger.info(`Wait for "${this.name}" is displayed`)
        return this.driver.wait(async () => {
                return await this.element.isDisplayed()
            },
            timeouts.explicit)
    }

    /**
     * Wait if element is not displayed
     * @returns {<Promise<boolean>>} true of false
     */
    async waitForNotPresent() {
        this.elements = await this.findElements()
        logger.info(`Wiat for "${this.name}" element is not present`)
        if (this.elements.length === 0) {
            return true
        }
        return await this.driver.wait(until.stalenessOf(this.elements[0]))
    }

    /**
     * Check if element is displayed
     * @returns {<boolean>} true of false
     */
    async isElementDisplayed() {
        logger.info(`Check "${this.name}" element is displayed`)
        this.element = await this.find()
        return await this.element.isDisplayed();
    }

    /**
     * Wait if element is enabled
     * @returns {<Promise<boolean>>} true of false
     */
    async waitForElementEnabled() {
        this.element = await this.find()
        logger.info(`Wait for "${this.name}" element is enabled`)
        return this.driver.wait(async () => {
                return this.element.isEnabled()
            },
            timeouts.explicit)
    }

    /**
     * Check if element is enabled
     * @returns {<boolean>} true of false
     */
    async isElementEnabled() {
        this.element = await this.find()
        logger.info(`Check "${this.name}" element is enables`)
        return this.element.isEnabled();
    }

    /**
     * Scroll to element
     * @returns {<void>}
     */
    async scrollToElement() {
        //this.element = await this.find()
        await this.waitForElementDisplayed()
        logger.info(`Scroll to ${this.name} element`)
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", this.element);
    }

    /**
     * Click element
     * @returns {<void>}
     */
    async clickElement() {
        await this.waitForElementDisplayed()
        this.element = await this.find();
        logger.info(`Click ${this.name} element`)
        await this.element.click()
    }

    /**
     * Get text from element
     * @returns {<string>} text from element
     */
    async getText() {
        await this.waitForElementDisplayed()
        logger.info(`Get text from ${this.name} element`)
        return this.element.getText()
    }

    /**
     * Get text from elements
     * @returns {<Array<string>>} texts from elements
     */
    async getTextFromElements() {
        this.elements = await this.findElements()
        logger.info(`Get text from ${this.name} elements`)
        let texts = []
        for (let e of this.elements) {
            texts.push(await e.getText())
        }
        return texts
    }

    /**
     * Type value to field
     * @param {string} text
     * @returns {<void>}
     */
    async typeText(text) {
        await this.waitForElementDisplayed()
        logger.info(`Type ${text} to ${this.name} element`)
        return this.element.sendKeys(text)
    }

    /**
     * @returns {<void>}
     */
    async switchToIframe() {
        this.iframe = await this.find()
        logger.info('Switch to iframe')
        await this.driver.switchTo().frame(this.iframe)
    }
}

module.exports = BaseElement