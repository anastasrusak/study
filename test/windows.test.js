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
const browserWindowsForm = require('../forms/browserWindowsForm')
const linksForm = require('../forms/linksForm')
const sampleForm = require('../forms/sampleForm')
const menuItems = require('./testData/menuItems.json')
const links = require('./testData/links.json')

describe('Test windows', () => {
    beforeEach(async () => {
        await browser.start()

    })
    afterEach(async () => {
        await browser.quit()
    })
    it('Windows work as expected', async () => {
        logger.info('Go to homepage')
        await expect(await homePage.isPageOpened(), 'Homepage is not opened').to.be.true
        await homePage.clickAlertsFrameWindowsButton()
        await expect(await alertFrameAndWindowForm.isPageOpened(), '"Alerts, Frame & Windows" page is not opened').to.be.true
        logger.info(`Open browser windows form`)
        await menu.clickMenuItem(menuItems.windows)
        await expect(await browserWindowsForm.isPageOpened()).to.be.true
        logger.info(`Open new tab`)
        await browserWindowsForm.clickNewTabButton()
        await browser.switchToLastWindow()
        await expect((await browser.getCurrentUrl()).endsWith('/sample') && (await sampleForm.isPageOpened())).to.be.true
        logger.info(`Close current tab`)
        await browser.closeWindow()
        await expect(await browserWindowsForm.isPageOpened()).to.be.true
        logger.info(`Go to elements > links form`)
        await menu.clickMenuGroupItem(menuItems.elementsSection)
        await menu.clickMenuItem(menuItems.elements.links)
        await expect(await linksForm.isPageOpened()).to.be.true
        logger.info(`Click home link and go to homapage`)
        await linksForm.clickLink(links.homeLink)
        await browser.switchToLastWindow()
        await expect(await homePage.waitForPageOpened(), 'Homepage is not opened').to.be.true
        logger.info(`Go to previous page`)
        await browser.switchToFirstWindow()
        await expect(await linksForm.isPageOpened()).to.be.true

    })
})