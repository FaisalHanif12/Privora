const cors = require('cors');

// CORS Configuration for different environments
const getCorsOptions = (environment = 'development') => {
  const baseOrigins = [
    'http://localhost:3000',
    'http://localhost:8081',
    'http://localhost:5000'
  ];

  const developmentOrigins = [
    ...baseOrigins,
    'http://192.168.0.117:5000',
    'http://192.168.0.117:3000',
    'http://192.168.0.117:8081',
    'exp://192.168.0.117:8081',
    'exp://localhost:8081'
  ];

  const productionOrigins = [
    // Add your production domains here
    'https://yourdomain.com',
    'https://www.yourdomain.com'
  ];

  let allowedOrigins;
  switch (environment) {
    case 'production':
      allowedOrigins = productionOrigins;
      break;
    case 'development':
    default:
      allowedOrigins = developmentOrigins;
      break;
  }

  return {
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log(`Blocked request from origin: ${origin}`);
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true, // Allow cookies and authorization headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
    maxAge: 86400 // Cache preflight response for 24 hours
  };
};

// Middleware function to apply CORS
const corsMiddleware = (environment = 'development') => {
  const options = getCorsOptions(environment);
  return cors(options);
};

// Additional security headers middleware
const securityHeaders = (req, res, next) => {
  // Set CORS headers
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
};

module.exports = {
  corsMiddleware,
  securityHeaders,
  getCorsOptions
};
