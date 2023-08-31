const { default: axios } = require("axios")

const acHandler = {
    async getBalanceSheet(query) {
        try {
            const qs = new URLSearchParams(query)
            const URL = (process.env.AC_URL || 'http://localhost:3001') + '/balSheet?' + qs.toString()
            const response = await axios.get(URL)
            return { data: response.data }
        } catch (err) {
            if (err.response) return err.response.data
            else {
                console.log(err)
                return { error: err.message }
            }
        }
    }
}


module.exports = acHandler 