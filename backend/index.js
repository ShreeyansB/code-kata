const express = require('express')
const cors = require('cors')
const myConstants = require('./constants')
const schema = require('./schema')
const app = express()

app.use(cors())
app.use(express.json())

app.get('/init', (req, res) => {
    console.log('Recieived init request');
    res.send(myConstants.INIT_RESPONSE)
})

app.post('/fetchBalSheet', (req, res) => {
    console.log('Receieved balance sheet request:', req.body)
    const validationResult = schema.fetchBalSheetSchema.validate(req.body)
    if(validationResult.error) {
        res.status(400).json({ 
            message: myConstants.FETCH_BAL_SCHEMA_ERR_RESPONSE, 
            data: req.body 
          }) 
    } else {
        res.send('Success')
    }
})

app.listen(process.env.port || 3000,
    () => console.log('Listening for requests...')
)


