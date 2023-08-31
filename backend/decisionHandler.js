const { default: axios } = require("axios")

const decHandler = {
    async getDecision(body) {
        try {
            const URL = (process.env.DEC_URL || 'http://localhost:3002') + '/calcDecision'
            const response = await axios.post(URL, body)
            return { data: response.data }
        } catch (err) {
            if (err.response) return err.response.data
            else return { error: err.message }
        }
    }
}


module.exports = decHandler 