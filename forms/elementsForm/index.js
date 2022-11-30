const BaseForm = require('../../framework/baseForm')
const BaseElement = require('../../framework/baseElement');

class ElementsForm extends BaseForm {
    constructor() {
        super(`//div[@class="main-header" and text()="Elements"]`, `"Elements" page`)
    }

}

module.exports = new ElementsForm()