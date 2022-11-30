const BaseForm = require('../../framework/baseForm')
const BaseElement = require('../../framework/baseElement');

class WebTables extends BaseForm {
    constructor() {
        super(`//div[@class="main-header" and text()="Web Tables"]`, `"Web Tables" page`)
    }

    addButton = () => new BaseElement(`//button[@id="addNewRecordButton"]`, `"Add" button`)
    tableRows = () => new BaseElement(`//div[@class="rt-tbody"]//div[@role="row"]`, `Table content`)
    deleteButton = (id) => new BaseElement(`(//div[@class="rt-tbody"]//div[@role="row"]//span[@title="Delete"])[${id}]`, 'Delete button')

    /**
     * Click add button
     */
    async clickAddButton() {
        await this.addButton().scrollToElement()
        await this.addButton().clickElement()
    }

    /**
     * Get table data
     */
    async getTableData() {
        return await this.tableRows().getTextFromElements()
    }

    /**
     * Delete row from the table
     */
    async clickDeleteButton(id) {
        await this.deleteButton(id).scrollToElement()
        await this.deleteButton(id).clickElement()
    }

}

module.exports = new WebTables()