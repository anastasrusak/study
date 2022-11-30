const BaseForm = require('../../framework/baseForm')
const BaseElement = require('../../framework/baseElement');

class AlertFrameAndWindowForm extends BaseForm {
    constructor() {
        super(`//div[@class="main-header" and text()="Alerts, Frame & Windows"]`, `"Alerts, Frame & Windows" page`)
    }

}

module.exports = new AlertFrameAndWindowForm()