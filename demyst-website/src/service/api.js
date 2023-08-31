import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'
const INIT_PATH = '/init'
const BAL_SHEET_PATH = '/fetchBalSheet'
const LOAN_DECISION_PATH = '/fetchDecision'

const api = {
    async getInit() {
        try {
            const response = await axios.get(
                BACKEND_URL + INIT_PATH
            )

            return response.data
        } catch (err) {
            if (err.response) return err.response.data
            else return { error: err.message }
        }
    },

    async getBalanceSheet(query) {
        try {
            const response = await axios.get(
                BACKEND_URL + BAL_SHEET_PATH, { params: query }
            )

            return response.data
        } catch (err) {
            if (err.response) return err.response.data
            else return { error: err.message }
        }
    },

    async getLoanDecision(query) {
        try {
            const response = await axios.post(
                BACKEND_URL + LOAN_DECISION_PATH, query
            )

            return response.data
        } catch (err) {
            if (err.response) return err.response.data
            else return { error: err.message }
        }
    }
}

export default api