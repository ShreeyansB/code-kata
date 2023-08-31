## API Documentation

### Get Balance Sheet API

GET /balSheet

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