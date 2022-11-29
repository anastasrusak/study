const {
    describe,
    it,
    Hook
} = require('mocha')
const expect = require('chai').expect;
const logger = require('../framework/utils/logger')
const browser = require('../framework/browser');
const homePage = require('../forms/homePage');
const menu = require('../forms/menu');
const alertFrameAndWindowForm = require('../forms/alertFrameAndWindowForm')
const alertsForm = require('../forms/alertForm')
const alertButtons = require('./testData/alertButtons.json')
const StringUtils = require('../framework/utils/stringUtils')
const successMessages = require('./testData/successMessages')
const menuItems = require('./testData/menuItems.json')

describe('Test alerts', () => {
    beforeEach(async () => {
        await browser.start()
    })
    afterEach(async () => {
        await browser.quit()
    })
    it('alerts works as expected', async () => {
        logger.info('Go to homepage')
        await expect(await homePage.isPageOpened(), 'Homepage is not opened').to.be.true
        logger.info('Go to alerts form')
        await homePage.clickAlertsFrameWindowsButton()
        await expect(await alertFrameAndWindowForm.isPageOpened(), '"Alerts, Frame & Windows" page is not opened').to.be.true
        await menu.clickMenuItem(menuItems.alerts);
        await expect(await alertsForm.isPageOpened(), 'Alerts from is not opened').to.be.true
        logger.info('Open alert')
        await alertsForm.clickButtonToSeeAlert(alertButtons.alertButton)
        await expect(await browser.alertIsDisplayed(), 'Alerts is not opened').to.be.an.instanceof(Object)
        logger.info('Accept alert')
        await browser.acceptAlert()
        await expect(await browser.alertIsDisplayed(), 'Alerts is opened').to.be.false
        logger.info('Open confirm')
        await alertsForm.clickButtonToSeeAlert(alertButtons.confirmButton)
        await expect(await browser.alertIsDisplayed(), 'Confirm is not opened').to.be.an.instanceof(Object)
        await expect(await browser.getAlertText()).to.equal('Do you confirm action?', 'Confirm text is not correct')
        logger.info('Accept confirm')
        await browser.acceptAlert()
        await expect(await browser.alertIsDisplayed(), 'Confirm is opened').to.be.false
        await expect(await alertsForm.getConfirmationMassage()).to.equal('You selected Ok', 'Success confirmation message is not correct')
        logger.info('Open prompt')
        await alertsForm.clickButtonToSeeAlert(alertButtons.promptButton)
        await expect(await browser.alertIsDisplayed(), 'Prompt is not opened').to.be.an.instanceof(Object)
        logger.info('Accept prompt')
        let name = StringUtils.generateText();
        await browser.sentMessage(name)
        await browser.acceptAlert()
        await expect(await browser.alertIsDisplayed(), 'Confirm is opened').to.be.false
        await expect(await alertsForm.getPromptMessage()).to.equal(successMessages.promptButton(name), 'Prompt message is not correct')
    })
})