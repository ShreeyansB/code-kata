const { default: axios } = require("axios")

const acHandler = {
    async getBalanceSheet(query) {
        try {
            const qs = new URLSearchParams(query)
            const URL = (process.env.AC_URL || 'http://localhost:3001') + '/balSheet?' + qs.toString()
            const response = await axios.get(URL)
            return { data: response.data }
        } catch (error) {
            return error.response.data
        }
    }
}


module.exports = acHandler 