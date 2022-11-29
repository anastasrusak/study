const {
    describe,
    it,
    Hook
} = require('mocha')
const expect = require('chai').expect;
const logger = require('../framework/utils/logger')
const browser = require('../framework/browser');
const homePage = require('../forms/homePage');
const menu = require('../forms/menu');
const elementsForm = require('../forms/elementsForm')
const webTables = require('../forms/webTablesForm')
const registrationForm = require('../forms/registrationForm')
const menuItems = require('./testData/menuItems.json')
const users = require('./testData/users')
const {
    modifyTableData
} = require('./helper');

describe('Test tables', () => {
    beforeEach(async () => {
        await browser.start()
    })
    afterEach(async () => {
        await browser.quit()
    })

    users.forEach((user) => {
        const {
            id,
            firstName,
            lastName,
            userEmail,
            age,
            salary,
            department
        } = user;
        it(`add users with ${id} id to table`, async () => {
            logger.info('Go to homepage')
            await expect(await homePage.isPageOpened(), 'Homepage is not opened').to.be.true
            logger.info('Go to elements > web tables form')
            await homePage.clickCategoryButton("Elements")
            await expect(await elementsForm.isPageOpened(), '"Elements" page is not opened').to.be.true
            await menu.clickMenuItem(menuItems.elements.webTables)
            logger.info('Click add button')
            await webTables.clickAddButton()
            await expect(await registrationForm.isPageOpened(), '"Registration form" modal is not opened').to.be.true
            logger.info(`Add user with ${id} id to the table`)
            for (let key in user) {
                if (key === 'id') {
                    continue;
                } else {
                    await registrationForm.typeValue(key, user[key])
                }
            }
            await registrationForm.clickSubmitButton()
            await expect(await registrationForm.isPageClosed(), '"Registration form" modal is opened').to.be.true
            let tableData = await webTables.getTableData()
            let usersTable = modifyTableData(tableData)
            let newUser = Object.values(user).map((item) => String(item)).splice(1).sort()
            await expect(usersTable, `${newUser} is not displayed in the table`).to.deep.include(newUser)
            logger.info(`Delete user with ${id} id`)
            let i = 0;
            outer: for (let row of usersTable) {
                i += 1;
                for (let i = 0; i < row.length; i++) {
                    if (!(row[i] === newUser[i])) continue outer;
                }
            }
            await webTables.clickDeleteButton(i)
            tableData = await webTables.getTableData()
            let updatedUsersTable = modifyTableData(tableData)
            await expect(updatedUsersTable.length, `User was not deleted`).to.equal(usersTable.length - 1)
            await expect(updatedUsersTable, `${newUser} is not displayed in the table`).to.not.deep.include(newUser)
        })
    })
})