class StringUtils {

    /**
     * Generate random text
     * @returns {string} string without spaces
     */
    static generateText() {
        let text = "";
        const symbols = "abcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 10; i++)
            text += symbols[Math.floor(Math.random() * symbols.length)];
        return text;
    }
}

module.exports = StringUtils;