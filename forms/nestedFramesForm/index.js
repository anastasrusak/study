const BaseForm = require('../../framework/baseForm')
const BaseElement = require('../../framework/baseElement');

class NestedFramesForm extends BaseForm {
    constructor() {
        super(`//div[@class="main-header" and text()="Nested Frames"]`, `"Nested Frames" page`)
    }

    parentIframe = () => new BaseElement(`//iframe[@id="frame1"]`, `Parent iframe`)
    chaildIframe = () => new BaseElement(`//iframe[contains(@srcdoc, "Child Iframe")]`, `Child iframe`)
    parentIfrmaHeader = () => new BaseElement(`//body[text()="Parent frame"]`, `Parent iframe header`)
    chaildIfrmaHeader = () => new BaseElement(`//p[text()="Child Iframe"]`, `Chaild iframe header`)

    /**
     * Get text from parent iframe
     */
    async getTextFromParentIframe() {
        await this.parentIframe().switchToIframe()
        return await this.parentIfrmaHeader().getText()
    }

    /**
     * Get text from child iframe
     */
    async getTextFromChildIframe() {
        await this.chaildIframe().switchToIframe()
        return await this.chaildIfrmaHeader().getText()
    }
}

module.exports = new NestedFramesForm()