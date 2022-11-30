const BaseForm = require('../../framework/baseForm')
const BaseElement = require('../../framework/baseElement');


class linksForm extends BaseForm {
    constructor() {
        super(`//div[@class="main-header" and text()="Links"]`, `"Links" page`)
    }

    link = (text) => new BaseElement(`//a[@id="simpleLink" and text()="${text}"]`, `"${text}" link`)

    /**
     * Click link
     */
    async clickLink(text) {
        await this.link(text).scrollToElement()
        await this.link(text).clickElement()
    }
}

module.exports = new linksForm()