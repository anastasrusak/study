const BaseForm = require('../../framework/baseForm')
const BaseElement = require('../../framework/baseElement');


class browserWindowsForm extends BaseForm {
    constructor() {
        super(`//div[@class="main-header" and text()="Browser Windows"]`, `"Browser Windows" page`)
    }

    newTabButton = () => new BaseElement(`//button[@id="tabButton"]`, `"New Tab" Button`)


    /**
     * Clic new tab button
     */
    async clickNewTabButton() {
        await this.newTabButton().scrollToElement()
        await this.newTabButton().clickElement()
    }
}

module.exports = new browserWindowsForm()