## API Documentation

### Get Decision Engine API

GET /balSheet

- Description: Retrieves a decision for loan request.
- Request:
```json
{
  "name": "string",
  "yearEstablished": number,
  "loanAmount": number,
  "balanceSheet": [
    {
      "year": number,
      "month": number,
      "assetsValue": number,
      "profitOrLoss": number
    }
  ]
}
```
- Response:
```json
{
  "isApproved": boolean,
  "preAssessment": number,
  "amount": number
}
```
- Error Response:
```json
{
  "error": "Invalid request parameters",
  "data": {
    "name": "string",
    "yearEstablished": number
  }
}
```