## API Documentation

### Initialize API

GET /init

- Description: Initializes the API and returns a predefined response.
- Request: None
- Response:

```json
{
  "message": "API initialized successfully"
}
```

### Fetch Balance Sheet

GET /fetchBalSheet

- Description: Retrieves a balance sheet for a given business.
- Request:
```json
{
  "name": "string",
  "yearEstablished": number
}
```

- Response:
```json
[
    {
        "year": number,
        "month": number,
        "profitOrLoss": number,
        "assetsValue": number
    },
    {
        "year": number,
        "month": number,
        "profitOrLoss": number,
        "assetsValue": number
    }
]
```

- Error Response (same for fetch decision):
```json
{
  "error": "Invalid request parameters",
  "data": {
    "name": "string",
    "yearEstablished": number
  }
}
```

### Fetch Loan Decision

GET /fetchDecision

- Description: Requests a loan decision based on a business's financial data.
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