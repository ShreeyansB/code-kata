const express = require('express')
const cors = require('cors')
const myConstants = require('./constants')
const schema = require('./schema')
const acHandler = require('./accountingHandler')
const decHandler = require('./decisionHandler')
const app = express()

app.use(cors())
app.use(express.json())

// Utility Functions 

function calcProfit12Months(balanceSheet) {
    const result = balanceSheet.slice(0, 12).reduce((accu, curr) => accu += curr.profitOrLoss, 0)
    return result
}

function calcAvgAssetsValue12Months(balanceSheet) {
    const result = balanceSheet.slice(0, 12).reduce((accu, curr) => accu += curr.assetsValue, 0)
    return result / 12
}

function calculatePreAssessment(amount, balanceSheet) {
    let preAssessment = 20

    const profit12Months = calcProfit12Months(balanceSheet)
    const avgAssetValue12Months = calcAvgAssetsValue12Months(balanceSheet)

    if (profit12Months > 0) {
        preAssessment = 60;
    }

    if (avgAssetValue12Months > amount) {
        preAssessment = 100;
    }

    return preAssessment
}

function calculateSummary(balanceSheet) {
    const yearProfitMap = {};

    balanceSheet.forEach((item) => {
        const { year, profitOrLoss } = item;

        if (year in yearProfitMap) {
            yearProfitMap[year] += profitOrLoss;
        } else {
            yearProfitMap[year] = profitOrLoss;
        }
    });

    const summary = Object.entries(yearProfitMap).map(([year, profit]) => ({
        year: parseInt(year),
        profit,
    }));

    return summary
}

// Resuest Handlers

app.get('/init', (req, res) => {
    console.log(`[${req.method}]`, 'Received init request');

    res.send(myConstants.INIT_RESPONSE)
})

app.get('/fetchBalSheet', async (req, res) => {
    console.log(`[${req.method}]`, 'Received balance sheet request:', req.query)

    const validationResult = schema.fetchBalSheetSchema.validate(req.query)
    if (validationResult.error) {
        res.status(400).json({
            error: myConstants.FETCH_BAL_SCHEMA_ERR_RESPONSE,
            data: req.query
        })
    } else {
        console.log('Sending request to accounting provider')

        const payload = {
            name: req.query.name,
            yearEstablished: req.query.yearEstablished
        }

        const response = await acHandler.getBalanceSheet(payload)
        console.log(response)

        if (response.error) {
            res.status(400).json(response.error)
        } else {
            res.send(response)
        }
    }
})

app.post('/fetchDecision', async (req, res) => {
    console.log(`[${req.method}]`, 'Received decision request:', req.body)

    const validationResult = schema.fetchDecisionSchema.validate(req.body)
    if (validationResult.error) {
        res.status(400).json({
            error: myConstants.FETCH_DECISION_SCHEMA_ERR_RESPONSE,
            data: req.body
        })
    } else {
        req.body.balanceSheet.sort((a, b) => {
            if (a.year === b.year) {
                return b.month - a.month;
            }
            return b.year - a.year;
        });

        const preAssessment = calculatePreAssessment(req.body.loanAmount, req.body.balanceSheet)
        const summary = calculateSummary(req.body.balanceSheet)

        console.log('Sending request to decision engine')

        const payload = {
            name: req.body.name,
            yearEstablished: req.body.yearEstablished,
            loanAmount: req.body.loanAmount,
            preAssessment,
            summary
        }

        const response = await decHandler.getDecision(payload)

        if (response.error) {
            res.status(400).json(response.error)
        } else {
            res.send(response)
        }
    }
})

app.listen(process.env.port || 3000,
    () => console.log('Listening for requests...')
)


