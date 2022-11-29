const BaseForm = require('../../framework/baseForm')
const BaseElement = require('../../framework/baseElement');
class HomePage extends BaseForm {
    constructor() {
        super(`//div[@class="home-banner"]`, `Homepage`)
    }

    alertsFrameWindowsButton = () => new BaseElement(`//div//h5[text() = "Alerts, Frame & Windows"]`, `"Alerts, Frame & Windows" button`)
    categoryButton = (category) => new BaseElement(`//div//h5[text() = "${category}"]`, `"${category}" button`)

    /**
     * Check is 'Alerts, Frame and Windows' button is displayed
     */
    async isAlertsFrameWindowsDisplayed() {
        return this.alertsFrameWindowsButton().isElementDisplayed()
    }

    /**
     * Click 'Alerts, Frame and Windows' button
     */
    async clickAlertsFrameWindowsButton() {
        await this.alertsFrameWindowsButton().scrollToElement()
        await this.alertsFrameWindowsButton().clickElement()
    }

    /**
     * Scroll to 'Alerts, Frame and Windows' button
     */
    async scrollToAlertsFrameWindowsButton() {
        await this.alertsFrameWindowsButton().scrollToElement()
    }

    /**
     * Click button
     */
    async clickCategoryButton(category) {
        await this.categoryButton(category).scrollToElement()
        await this.categoryButton(category).clickElement()
    }
}

module.exports = new HomePage()