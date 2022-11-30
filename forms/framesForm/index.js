const BaseForm = require('../../framework/baseForm')
const BaseElement = require('../../framework/baseElement');


class framesForm extends BaseForm {
    constructor() {
        super(`//div[@class="main-header" and text()="Frames"]`, `"Frames" page`)
    }

    iframe = (id) => new BaseElement(`//iframe[@id="frame${id}"]`, ` ${id} Iframe`)
    iframeText = () => new BaseElement(`//h1[@id="sampleHeading"]`, `Iframe heading`)


    /**
     * Get text from iframe
     */
    async getTextFromIframe(id) {
        await this.iframe(id).switchToIframe()
        return await this.iframeText().getText()
    }
}

module.exports = new framesForm()