const BaseForm = require('../../framework/baseForm')
const BaseElement = require('../../framework/baseElement');

class RegistrationForm extends BaseForm {
    constructor() {
        super(`//div[@id="registration-form-modal"]`, `"Registration form" modal`)
    }

    input = (label) => new BaseElement(`//form[@id="userForm"]//input[@id="${label}"]`, `${label} input`)
    submitButton = () => new BaseElement(`//form[@id="userForm"]//button[@id="submit"]`, `"Submit" button`)

    /**
     * Type value to registration form
     */
    async typeValue(label, text) {
        await this.input(label).typeText(text)
    }

    /**
     * Submit the registration form
     */
    async clickSubmitButton() {
        await this.submitButton().clickElement()
    }

}

module.exports = new RegistrationForm()