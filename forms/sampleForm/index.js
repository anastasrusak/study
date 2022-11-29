const BaseForm = require('../../framework/baseForm')
const BaseElement = require('../../framework/baseElement');


class sampleForm extends BaseForm {
    constructor() {
        super(`//h1[text() = 'This is a sample page']`, `Sample page`)
    }
}

module.exports = new sampleForm()