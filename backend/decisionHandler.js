const { default: axios } = require("axios")

const decHandler = {
    async getDecision(body) {
        try {
            const URL = (process.env.DEC_URL || 'http://localhost:3002') + '/calcDecision'
            const response = await axios.post(URL, body)
            return { data: response.data }
        } catch (error) {
            return error.response.data
        }
    }
}


module.exports = decHandler 