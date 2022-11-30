const BaseForm = require('../../framework/baseForm')
const BaseElement = require('../../framework/baseElement');

class AlertForm extends BaseForm {
    constructor() {
        super(`//div[@class="main-header" and text()="Alerts"]`, `"Alerts" page`)
    }

    buttonToSeeAlert = (text) => new BaseElement(`//div[./span[text()= "${text}"]]/following-sibling::div/button`, "Button to see alert")
    confirmationMassage = () => new BaseElement(`//span[@id="confirmResult"]`, `Success confirmation message`)
    promptMessage = () => new BaseElement(`//span[@id="promptResult"]`, `Prompt message`)


    /**
     * Click button to see alert
     */
    async clickButtonToSeeAlert(text) {
        await this.buttonToSeeAlert(text).scrollToElement()
        await this.buttonToSeeAlert(text).clickElement();
    }

    /**
     * Get confrimation message
     */
    async getConfirmationMassage() {
        return this.confirmationMassage().getText();
    }

    /**
     * Get prompt message
     */
    async getPromptMessage() {
        return this.promptMessage().getText();
    }

}

module.exports = new AlertForm()