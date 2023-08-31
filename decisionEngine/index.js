const express = require('express')
const cors = require('cors')
const myConstants = require('./constants')
const schema = require('./schema')
const app = express()

app.use(cors())
app.use(express.json())

function calculateLoan(amount, preAssessment) {
    return amount * preAssessment / 100
}

app.post('/calcDecision', (req, res) => {
    console.log(`[${req.method}]`, 'Received Decision request:', req.body);


    const validationResult = schema.getDecisionSchema.validate(req.body)
    if (validationResult.error) {

        console.log(validationResult)

        res.status(400).json({
            error: myConstants.CALC_DECISION_SCHEMA_ERR_RESPONSE,
            data: req.body
        })
    } else {
        const response = {
            isApproved: true,
            loanAmount: calculateLoan(req.body.loanAmount, req.body.preAssessment),
            preAssessment: req.body.preAssessment
        }

        res.send(response)
    }
})



app.listen(process.env.port || 3002,
    () => console.log('Listening for requests...')
)


