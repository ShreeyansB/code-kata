const myConstants = require("./constants")

const db = {
    getBalSheet() {
        return { result: myConstants.BALANCE_SHEET }
    },
}

module.exports = db