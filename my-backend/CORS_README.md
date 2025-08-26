# CORS Configuration Guide

## Overview
This guide explains how CORS (Cross-Origin Resource Sharing) is configured in your Privora backend to allow requests from specific origins while maintaining security.

## What is CORS?
CORS is a security feature implemented by web browsers that controls which web pages can make requests to your API from different origins (domains, ports, or protocols).

## Current Configuration

### Allowed Origins
Your server is configured to accept requests from the following origins:

#### Development Environment
- `http://192.168.0.117:5000` - Your backend server
- `http://192.168.0.117:3000` - React development server
- `http://192.168.0.117:8081` - Expo development server
- `http://localhost:3000` - Local React development
- `http://localhost:8081` - Local Expo development
- `http://localhost:5000` - Local backend server
- `exp://192.168.0.117:8081` - Expo development on network
- `exp://localhost:8081` - Local Expo development

#### Production Environment
- Add your production domains to `config/cors.js`

### Allowed Methods
- `GET` - Retrieve data
- `POST` - Create new data
- `PUT` - Update existing data
- `DELETE` - Remove data
- `PATCH` - Partial updates
- `OPTIONS` - Preflight requests

### Allowed Headers
- `Content-Type` - Request body type
- `Authorization` - Authentication tokens
- `X-Requested-With` - AJAX requests
- `Accept` - Response format preference

### Security Features
- **Credentials**: Enabled for authentication
- **Preflight Caching**: 24 hours for OPTIONS requests
- **Origin Validation**: Strict checking of allowed origins
- **Security Headers**: Additional CORS headers for compatibility

## File Structure

```
my-backend/
├── config/
│   └── cors.js          # CORS configuration
├── server.js            # Main server file
├── test-cors.js         # CORS testing script
└── CORS_README.md       # This file
```

## Configuration Files

### `config/cors.js`
Contains the main CORS configuration with environment-specific settings.

### `server.js`
Uses the CORS configuration and applies security headers.

## How to Modify CORS Settings

### 1. Add New Allowed Origins

Edit `config/cors.js` and add new origins to the appropriate array:

```javascript
const developmentOrigins = [
  ...baseOrigins,
  'http://192.168.0.117:5000',
  'http://192.168.0.117:3000',
  'http://192.168.0.117:8081',
  'exp://192.168.0.117:8081',
  'exp://localhost:8081',
  'http://your-new-domain.com',  // Add new domains here
  'https://your-https-domain.com'
];
```

### 2. Change Environment

Set the `NODE_ENV` environment variable:

```bash
# Development (default)
NODE_ENV=development npm run dev

# Production
NODE_ENV=production npm start
```

### 3. Modify Allowed Methods

Update the methods array in `config/cors.js`:

```javascript
methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD']
```

### 4. Modify Allowed Headers

Update the allowedHeaders array:

```javascript
allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Custom-Header']
```

## Testing CORS Configuration

### Automatic Testing
Run the provided test script:

```bash
cd my-backend
node test-cors.js
```

### Manual Testing
1. Start your server: `npm run dev`
2. Open browser console at `http://192.168.0.117:5000`
3. Test with different origins:

```javascript
// Test allowed origin
fetch('/', {
  headers: { 'Origin': 'http://192.168.0.117:5000' }
}).then(r => console.log('Status:', r.status));

// Test blocked origin
fetch('/', {
  headers: { 'Origin': 'http://malicious-site.com' }
}).then(r => console.log('Status:', r.status))
  .catch(e => console.log('Blocked:', e.message));
```

## Troubleshooting

### Common Issues

#### 1. CORS Error in Browser
```
Access to fetch at 'http://192.168.0.117:5000/api/auth/login' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solution**: Ensure the origin is in the allowed origins list in `config/cors.js`.

#### 2. Preflight Request Fails
```
Request header field Authorization is not allowed by Access-Control-Allow-Headers
```

**Solution**: Add 'Authorization' to the allowedHeaders array.

#### 3. Credentials Not Sent
```
The value of the 'Access-Control-Allow-Credentials' header in the response is 'false'
```

**Solution**: Ensure `credentials: true` is set in CORS options.

### Debug Mode
Enable detailed CORS logging by modifying `config/cors.js`:

```javascript
origin: function (origin, callback) {
  console.log('Request origin:', origin); // Add this line
  if (!origin) return callback(null, true);
  
  if (allowedOrigins.indexOf(origin) !== -1) {
    console.log('Origin allowed:', origin); // Add this line
    callback(null, true);
  } else {
    console.log('Origin blocked:', origin); // Add this line
    callback(new Error(`Origin ${origin} not allowed by CORS`));
  }
}
```

## Security Considerations

### 1. Never Use `origin: '*'` in Production
This allows any website to make requests to your API.

### 2. Validate Origins
Always validate origins against a whitelist.

### 3. Use HTTPS in Production
Always use HTTPS for production APIs.

### 4. Regular Updates
Regularly review and update allowed origins.

## Production Deployment

### 1. Update Environment
```bash
export NODE_ENV=production
```

### 2. Add Production Domains
Edit `config/cors.js` and add your production domains:

```javascript
const productionOrigins = [
  'https://yourdomain.com',
  'https://www.yourdomain.com'
];
```

### 3. Remove Development Origins
Consider removing development origins from production for security.

## Support

If you encounter CORS issues:

1. Check the server logs for blocked origins
2. Verify the origin is in the allowed list
3. Test with the provided test script
4. Check browser console for detailed error messages

## Additional Resources

- [MDN CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Express CORS Middleware](https://github.com/expressjs/cors)
- [CORS Security Best Practices](https://web.dev/cross-origin-resource-sharing/)
