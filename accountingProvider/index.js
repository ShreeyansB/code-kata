const express = require('express')
const cors = require('cors')
const myConstants = require('./constants')
const schema = require('./schema')
const db = require('./database')
const app = express()

app.use(cors())
app.use(express.json())

app.get('/balSheet', (req, res) => {
    console.log(`[${req.method}]`, 'Received bal sheet request:', req.query);
    const validationResult = schema.balSheetSchema.validate(req.query)
    if (validationResult.error) {
        res.status(400).json({
            error: myConstants.BAL_SHEET_SCHEMA_ERR_RESPONSE,
            data: req.query
        })
    } else {
        const { result, error } = db.getBalSheet(req.query)
        if (error) {
            res.status(404).json({
                error: myConstants.BAL_SHEET_NOT_FOUND_ERR_RESPONSE,
                data: req.query
            })
        } else {
            res.send(result)
        }
    }

})

app.listen(process.env.port || 3001,
    () => console.log('Listening for requests...')
)


