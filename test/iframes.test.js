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
const nestedFramesForm = require('../forms/nestedFramesForm')
const framesForm = require('../forms/framesForm')
const menuItems = require('./testData/menuItems.json')

describe('Test Iframea', () => {
    beforeEach(async () => {
        await browser.start()
    })
    afterEach(async () => {
        await browser.quit()
    })
    it('iframes works as expected', async () => {
        logger.info('Go to homepage')
        await expect(await homePage.isPageOpened(), 'Homepage is not opened').to.be.true
        logger.info('Go to nested frames form')
        await homePage.clickAlertsFrameWindowsButton()
        await expect(await alertFrameAndWindowForm.isPageOpened(), '"Alerts, Frame & Windows" page is not opened').to.be.true
        await menu.clickMenuItem(menuItems.nestedIframes);
        await expect(await nestedFramesForm.isPageOpened(), 'Nested Frames page is not opened').to.be.true
        await expect(await nestedFramesForm.getTextFromParentIframe()).to.equal(`Parent frame`, `Parent iframe text is not correct`)
        await expect(await nestedFramesForm.getTextFromChildIframe()).to.equal(`Child Iframe`, `Chaild iframe text is not correct`)
        await browser.leaveIframe()
        logger.info('Go to frames form')
        await menu.clickMenuItem(menuItems.iframes);
        await expect(await framesForm.isPageOpened(), 'Frames page is not opened').to.be.true
        const topIframeMes = await framesForm.getTextFromIframe(1)
        await browser.leaveIframe()
        const bottomIrameMes = await framesForm.getTextFromIframe(2)
        await expect(topIframeMes).to.equal(bottomIrameMes, `${topIframeMes} from top iframe is not eqaul to ${bottomIrameMes} from bottom iframe`)
    })
})