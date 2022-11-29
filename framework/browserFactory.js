const {
    Builder,
    Capabilities
} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require("chromedriver");
require('geckodriver');
const config = require('../config')

class BrowserFactory {
    constructior() {}

    async getDriver() {
        let caps;
        switch (config.browser) {
            case "chrome":
                caps = Capabilities.chrome();
                caps.set('goog:chromeOptions', {
                    args: ['--incognito', '--start-maximized']
                });
                break;
            case "firefox":
                caps = Capabilities.firefox();
                caps.set('moz:firefoxOptions', {
                    args: ['-private', '-start-maximized'],
                })
        }
        return await new Builder().forBrowser(config.browser).withCapabilities(caps).build();

    }
}

module.exports = BrowserFactory