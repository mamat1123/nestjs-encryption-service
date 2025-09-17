# NestJS Encryption Service

A NestJS-based microservice that provides RSA and AES encryption/decryption capabilities with comprehensive API documentation and testing.

## Features

- **RSA + AES Hybrid Encryption**: Combines RSA for key exchange and AES for data encryption
- **RESTful API**: Clean and well-documented endpoints
- **Swagger Documentation**: Interactive API documentation at `/api-docs`
- **Comprehensive Testing**: Unit tests and end-to-end tests
- **Input Validation**: Request validation using class-validator
- **Error Handling**: Proper error responses with error codes

## API Endpoints

### POST /get-encrypt-data
Encrypts a payload using hybrid RSA/AES encryption.

**Request Body:**
```json
{
  "payload": "string (required, max 2000 characters)"
}
```

**Response:**
```json
{
  "successful": boolean,
  "error_code": "string | null",
  "data": {
    "data1": "string (encrypted AES key)",
    "data2": "string (encrypted payload)"
  } | null
}
```

### POST /get-decrypt-data
Decrypts previously encrypted data.

**Request Body:**
```json
{
  "data1": "string (required, encrypted AES key)",
  "data2": "string (required, encrypted payload)"
}
```

**Response:**
```json
{
  "successful": boolean,
  "error_code": "string | null",
  "data": {
    "payload": "string (decrypted payload)"
  } | null
}
```

### GET /api-docs
Swagger UI documentation for all API endpoints.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. **Clone or download the project**
   ```bash
   cd nestjs-encryption-service
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

## How to Start the Service

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run start:prod
```

### Debug Mode
```bash
npm run start:debug
```

The service will start on `http://localhost:3000` by default.

## API Documentation

Once the service is running, visit `http://localhost:3000/api-docs` to access the interactive Swagger documentation.

## Testing

### Run Unit Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Tests with Coverage
```bash
npm run test:cov
```

### Run End-to-End Tests
```bash
npm run test:e2e
```

## Usage Examples

### Using curl

**Encrypt data:**
```bash
curl -X POST http://localhost:3000/get-encrypt-data \
  -H "Content-Type: application/json" \
  -d '{"payload": "Hello, World!"}'
```

**Decrypt data:**
```bash
curl -X POST http://localhost:3000/get-decrypt-data \
  -H "Content-Type: application/json" \
  -d '{"data1": "encrypted_aes_key", "data2": "encrypted_payload"}'
```

### Using JavaScript/Node.js

```javascript
const axios = require('axios');

// Encrypt data
async function encryptData(payload) {
  try {
    const response = await axios.post('http://localhost:3000/get-encrypt-data', {
      payload: payload
    });
    return response.data;
  } catch (error) {
    console.error('Encryption failed:', error.response.data);
  }
}

// Decrypt data
async function decryptData(data1, data2) {
  try {
    const response = await axios.post('http://localhost:3000/get-decrypt-data', {
      data1: data1,
      data2: data2
    });
    return response.data;
  } catch (error) {
    console.error('Decryption failed:', error.response.data);
  }
}

// Example usage
async function example() {
  // Encrypt
  const encryptResult = await encryptData('Hello, World!');
  console.log('Encrypted:', encryptResult);
  
  // Decrypt
  const decryptResult = await decryptData(
    encryptResult.data.data1,
    encryptResult.data.data2
  );
  console.log('Decrypted:', decryptResult);
}

example();
```

## Project Structure

```
src/
├── controllers/
│   ├── encryption.controller.ts      # API endpoints
│   └── encryption.controller.spec.ts # Controller tests
├── dto/
│   ├── encrypt-request.dto.ts        # Encrypt request validation
│   ├── encrypt-response.dto.ts       # Encrypt response schema
│   ├── decrypt-request.dto.ts        # Decrypt request validation
│   └── decrypt-response.dto.ts       # Decrypt response schema
├── services/
│   ├── crypto.service.ts             # Core crypto operations
│   ├── crypto.service.spec.ts        # Crypto service tests
│   ├── encryption.service.ts         # Business logic
│   └── encryption.service.spec.ts    # Encryption service tests
├── app.module.ts                     # Application module
└── main.ts                          # Application entry point

test/
└── app.e2e-spec.ts                  # End-to-end tests
```

## Error Codes

- `PAYLOAD_TOO_LONG`: Payload exceeds 2000 character limit
- `ENCRYPTION_FAILED`: General encryption error
- `DECRYPTION_FAILED`: General decryption error

## Security Notes

⚠️ **Important**: The RSA keys in this example are for demonstration purposes only. In production:

1. Generate your own RSA key pair using a secure method
2. Store keys securely (environment variables, key management service)
3. Use proper key rotation policies
4. Consider using hardware security modules (HSM) for key storage

## Environment Variables

You can customize the service using these environment variables:

- `PORT`: Server port (default: 3000)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

MIT License - see LICENSE file for details.
