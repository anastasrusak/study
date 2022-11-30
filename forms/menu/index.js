const BaseForm = require('../../framework/baseForm')
const BaseElement = require('../../framework/baseElement');

class Menu extends BaseForm {
    constructor() {
        super(`//div[@class="left-pannel"]`, `Navigation bar form`)
    }

    menuGroupItem = (item) => new BaseElement(`//div[@class="element-group" and .//div[text()= "${item}"]]`, `"${item}" group menu item`)
    menuItem = (item) => new BaseElement(`//li//span[text()="${item}"]`, `"${item}" menu item`)

    /**
     * Click menu option
     */
    async clickMenuGroupItem(item) {
        await this.menuGroupItem(item).scrollToElement();
        await this.menuGroupItem(item).clickElement();
    }

    /**
     * Click menu option
     */
    async clickMenuItem(item) {
        await this.menuItem(item).waitForElementDisplayed()
        await this.menuItem(item).scrollToElement();
        await this.menuItem(item).clickElement();
    }

}

module.exports = new Menu()